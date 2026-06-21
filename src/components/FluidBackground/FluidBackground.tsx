import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import {
  ADVECTION_SHADER,
  CLEAR_SHADER,
  CURL_SHADER,
  DISPLAY_SHADER,
  DIVERGENCE_SHADER,
  GRADIENT_SUBTRACT_SHADER,
  PRESSURE_SHADER,
  SPLAT_SHADER,
  VERTEX_SHADER,
  VORTICITY_SHADER,
} from './shaders';
import styles from './FluidBackground.module.css';

// Solver tuning. Lower sim resolution = cheaper; dye resolution drives detail.
const SIM_RESOLUTION = 128;
const DYE_RESOLUTION = 512;
const PRESSURE_ITERATIONS = 20;
const CONFIG = {
  // Low energy and slow pigment decay keep the wash fluid without making the
  // page feel restless.
  curl: 7.5,
  pressure: 0.82,
  velocityDissipation: 3.2,
  // How quickly the ink fades, so cursor trails don't pile up over the text.
  densityDissipation: 0.07,
  splatForce: 650,
  splatRadius: 0.0048,
  // Largest velocity a single pointer move may inject, so fast flicks still
  // stay soft instead of slamming a wave through the fluid.
  maxPointerDelta: 0.022,
  // Absorbance strength of the initial ink pools (kept light for readability).
  baseFillDensity: 0.16,
  // Absorbance the moving cursor leaves behind (small — mostly displaces ink).
  cursorDye: 0.045,
  // Click = a brush touching wet paper: a soft ink blot with a few uneven
  // satellite dabs and a gentle feathering bloom (not a violent burst).
  rippleForce: 820,
  rippleArms: 8,
  rippleSpread: 0.0065,
  rippleSplatRadius: 0.0058,
  rippleDye: 0.105,
};

interface DoubleFbo {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
  swap: () => void;
  dispose: () => void;
}

/**
 * Real-time "stable fluids" ink simulation rendered with Three.js. The pointer
 * injects pigment + velocity into a GPU fluid field that advects, swirls
 * (vorticity confinement) and is kept divergence-free via a Jacobi pressure
 * solve. Themed as subtractive sumi/ai/shu/matsuba ink on the warm paper
 * background; runs only on the homepage, behind all content.
 */
export function FluidBackground({ interactive = true }: { interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // The canvas paints the paper itself here, so suppress the CSS paper layer
    // while it is mounted to avoid doubling the texture.
    document.body.classList.add('fluid-bg-active');

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
      });
    } catch {
      // WebGL unavailable: fall back to the CSS paper layer.
      document.body.classList.remove('fluid-bg-active');
      return undefined;
    }
    renderer.autoClear = false;
    renderer.toneMapping = THREE.NoToneMapping;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    quad.frustumCulled = false;
    scene.add(quad);

    // Traditional ink colours and the warm paper. The dye buffer stores
    // absorbance A; the display recovers colour via paper * exp(-A).
    const INKS = {
      sumi: new THREE.Vector3(0.102, 0.102, 0.122),
      ai: new THREE.Vector3(0.086, 0.251, 0.478),
      shu: new THREE.Vector3(0.784, 0.216, 0.176),
      matsuba: new THREE.Vector3(0.18, 0.431, 0.322),
    };
    const PAPER = new THREE.Vector3(0.937, 0.918, 0.878);
    const INK_EPS = 0.012;

    function inkAbsorption(color: THREE.Vector3, strength: number): THREE.Vector3 {
      return new THREE.Vector3(
        -Math.log(Math.max(color.x, INK_EPS)) * strength,
        -Math.log(Math.max(color.y, INK_EPS)) * strength,
        -Math.log(Math.max(color.z, INK_EPS)) * strength
      );
    }

    const rtOptions = {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    } as const;

    function createFbo(w: number, h: number) {
      return new THREE.WebGLRenderTarget(w, h, rtOptions);
    }

    function createDoubleFbo(w: number, h: number): DoubleFbo {
      let a = createFbo(w, h);
      let b = createFbo(w, h);
      return {
        get read() {
          return a;
        },
        get write() {
          return b;
        },
        swap() {
          const tmp = a;
          a = b;
          b = tmp;
        },
        dispose() {
          a.dispose();
          b.dispose();
        },
      };
    }

    function makeMaterial(fragmentShader: string, uniforms: Record<string, THREE.IUniform>) {
      return new THREE.RawShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader,
        uniforms: { texelSize: { value: new THREE.Vector2() }, ...uniforms },
        depthTest: false,
        depthWrite: false,
        blending: THREE.NoBlending,
      });
    }

    const programs = {
      advection: makeMaterial(ADVECTION_SHADER, {
        uVelocity: { value: null },
        uSource: { value: null },
        dt: { value: 0 },
        dissipation: { value: 0 },
      }),
      divergence: makeMaterial(DIVERGENCE_SHADER, { uVelocity: { value: null } }),
      curl: makeMaterial(CURL_SHADER, { uVelocity: { value: null } }),
      vorticity: makeMaterial(VORTICITY_SHADER, {
        uVelocity: { value: null },
        uCurl: { value: null },
        curl: { value: CONFIG.curl },
        dt: { value: 0 },
      }),
      pressure: makeMaterial(PRESSURE_SHADER, {
        uPressure: { value: null },
        uDivergence: { value: null },
      }),
      gradient: makeMaterial(GRADIENT_SUBTRACT_SHADER, {
        uPressure: { value: null },
        uVelocity: { value: null },
      }),
      clear: makeMaterial(CLEAR_SHADER, { uTexture: { value: null }, value: { value: 0 } }),
      splat: makeMaterial(SPLAT_SHADER, {
        uTarget: { value: null },
        aspectRatio: { value: 1 },
        color: { value: new THREE.Vector3() },
        point: { value: new THREE.Vector2() },
        radius: { value: CONFIG.splatRadius },
      }),
      display: makeMaterial(DISPLAY_SHADER, {
        uTexture: { value: null },
        uPaper: { value: PAPER },
      }),
    };

    let width = 0;
    let height = 0;
    let velocity: DoubleFbo;
    let dye: DoubleFbo;
    let divergence: THREE.WebGLRenderTarget;
    let curl: THREE.WebGLRenderTarget;
    let pressure: DoubleFbo;
    const simTexel = new THREE.Vector2();

    function getResolution(resolution: number) {
      let aspect = width / height;
      if (aspect < 1) aspect = 1 / aspect;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspect);
      return width > height ? { w: max, h: min } : { w: min, h: max };
    }

    function initFramebuffers() {
      const sim = getResolution(SIM_RESOLUTION);
      const dyeRes = getResolution(DYE_RESOLUTION);
      simTexel.set(1 / sim.w, 1 / sim.h);

      velocity?.dispose();
      dye?.dispose();
      divergence?.dispose();
      curl?.dispose();
      pressure?.dispose();

      velocity = createDoubleFbo(sim.w, sim.h);
      pressure = createDoubleFbo(sim.w, sim.h);
      dye = createDoubleFbo(dyeRes.w, dyeRes.h);
      divergence = createFbo(sim.w, sim.h);
      curl = createFbo(sim.w, sim.h);

      Object.values(programs).forEach((p) => {
        (p.uniforms.texelSize.value as THREE.Vector2).copy(simTexel);
      });
    }

    function blit(material: THREE.RawShaderMaterial, target: THREE.WebGLRenderTarget | null) {
      quad.material = material;
      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
    }

    function splatVelocity(
      x: number,
      y: number,
      dx: number,
      dy: number,
      radius = CONFIG.splatRadius
    ) {
      const sp = programs.splat;
      sp.uniforms.aspectRatio.value = width / height;
      sp.uniforms.radius.value = radius;
      sp.uniforms.uTarget.value = velocity.read.texture;
      (sp.uniforms.point.value as THREE.Vector2).set(x, y);
      (sp.uniforms.color.value as THREE.Vector3).set(dx, dy, 0);
      blit(sp, velocity.write);
      velocity.swap();
    }

    function splatDye(x: number, y: number, color: THREE.Vector3, radius = CONFIG.splatRadius) {
      const sp = programs.splat;
      sp.uniforms.aspectRatio.value = width / height;
      sp.uniforms.radius.value = radius;
      sp.uniforms.uTarget.value = dye.read.texture;
      (sp.uniforms.point.value as THREE.Vector2).set(x, y);
      (sp.uniforms.color.value as THREE.Vector3).copy(color);
      blit(sp, dye.write);
      dye.swap();
    }

    // Splats inject absorbance (Beer–Lambert). Overlapping inks subtractively
    // blend in the dye buffer as the fluid carries them through one another.
    function inkSplatColor(strength: number, ink = INKS.sumi): THREE.Vector3 {
      const jitter = 0.92 + Math.random() * 0.16;
      return inkAbsorption(ink, strength * jitter);
    }

    // A click ripple: velocity pushed outward in a ring so the surrounding ink
    // a brush touching wet paper — a soft ink blot that feathers outward.
    const aspectAtRipple = () => width / height;
    function ripple(x: number, y: number, ink: THREE.Vector3) {
      const ar = aspectAtRipple();

      // Gentle, slightly uneven feathering bloom so the ink bleeds rather than
      // bursts. Jittered angles keep it organic instead of a perfect ring.
      const arms = CONFIG.rippleArms;
      for (let i = 0; i < arms; i += 1) {
        const angle = (i / arms) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const ox = x + (Math.cos(angle) * CONFIG.rippleSpread) / ar;
        const oy = y + Math.sin(angle) * CONFIG.rippleSpread;
        const force = CONFIG.rippleForce * (0.6 + Math.random() * 0.6);
        splatVelocity(
          ox,
          oy,
          Math.cos(angle) * force,
          Math.sin(angle) * force,
          CONFIG.rippleSplatRadius
        );
      }

      // The ink mark: a soft core plus a few uneven satellite dabs, like the
      // irregular blot a brush leaves where it first lands.
      splatDye(x, y, inkSplatColor(CONFIG.rippleDye, ink), CONFIG.rippleSplatRadius * 1.5);
      for (let i = 0; i < 4; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const dist = CONFIG.rippleSpread * (0.35 + Math.random() * 0.8);
        const dx = x + (Math.cos(angle) * dist) / ar;
        const dy = y + Math.sin(angle) * dist;
        splatDye(
          dx,
          dy,
          inkSplatColor(CONFIG.rippleDye * (0.35 + Math.random() * 0.45), ink),
          CONFIG.rippleSplatRadius * (0.6 + Math.random() * 0.7)
        );
      }
    }

    function step(dt: number) {
      // 1. Curl + vorticity confinement (adds the wispy ink swirls).
      programs.curl.uniforms.uVelocity.value = velocity.read.texture;
      blit(programs.curl, curl);

      programs.vorticity.uniforms.uVelocity.value = velocity.read.texture;
      programs.vorticity.uniforms.uCurl.value = curl.texture;
      programs.vorticity.uniforms.dt.value = dt;
      blit(programs.vorticity, velocity.write);
      velocity.swap();

      // 2. Divergence of velocity.
      programs.divergence.uniforms.uVelocity.value = velocity.read.texture;
      blit(programs.divergence, divergence);

      // 3. Pressure solve (Jacobi iterations) starting from a decayed guess.
      programs.clear.uniforms.uTexture.value = pressure.read.texture;
      programs.clear.uniforms.value.value = CONFIG.pressure;
      blit(programs.clear, pressure.write);
      pressure.swap();

      programs.pressure.uniforms.uDivergence.value = divergence.texture;
      for (let i = 0; i < PRESSURE_ITERATIONS; i += 1) {
        programs.pressure.uniforms.uPressure.value = pressure.read.texture;
        blit(programs.pressure, pressure.write);
        pressure.swap();
      }

      // 4. Subtract pressure gradient -> divergence-free velocity.
      programs.gradient.uniforms.uPressure.value = pressure.read.texture;
      programs.gradient.uniforms.uVelocity.value = velocity.read.texture;
      blit(programs.gradient, velocity.write);
      velocity.swap();

      // 5. Advect velocity, then dye, through the velocity field.
      programs.advection.uniforms.dt.value = dt;
      programs.advection.uniforms.uVelocity.value = velocity.read.texture;
      programs.advection.uniforms.uSource.value = velocity.read.texture;
      programs.advection.uniforms.dissipation.value = CONFIG.velocityDissipation;
      blit(programs.advection, velocity.write);
      velocity.swap();

      programs.advection.uniforms.uVelocity.value = velocity.read.texture;
      programs.advection.uniforms.uSource.value = dye.read.texture;
      programs.advection.uniforms.dissipation.value = CONFIG.densityDissipation;
      blit(programs.advection, dye.write);
      dye.swap();
    }

    function render() {
      programs.display.uniforms.uTexture.value = dye.read.texture;
      renderer.setRenderTarget(null);
      renderer.clear();
      blit(programs.display, null);
    }

    // Pointer tracking.
    const cursorPigments = [
      INKS.ai,
      INKS.matsuba,
      INKS.sumi,
      INKS.shu,
      INKS.ai,
      INKS.sumi,
    ];
    const pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, moved: false };
    let cursorPigmentIndex = 0;
    let cursorPigment = cursorPigments[cursorPigmentIndex];
    let lastPigmentChange = performance.now();
    let lastMove = 0;

    const clampDelta = (d: number) =>
      Math.max(-CONFIG.maxPointerDelta, Math.min(CONFIG.maxPointerDelta, d));

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === 'touch') return;
      const nx = event.clientX / window.innerWidth;
      const ny = 1 - event.clientY / window.innerHeight;
      // Clamp the raw movement so a fast flick can't slam a wave through.
      pointer.dx = clampDelta(nx - pointer.x) * CONFIG.splatForce;
      pointer.dy = clampDelta(ny - pointer.y) * CONFIG.splatForce;
      pointer.x = nx;
      pointer.y = ny;
      pointer.moved = Math.abs(pointer.dx) > 0 || Math.abs(pointer.dy) > 0;
      const now = performance.now();
      if (now - lastPigmentChange > 900) {
        cursorPigmentIndex = (cursorPigmentIndex + 1) % cursorPigments.length;
        cursorPigment = cursorPigments[cursorPigmentIndex];
        lastPigmentChange = now;
      }
      lastMove = now;
    }

    // Queue clicks and apply them inside the frame loop so the ripple renders
    // in sync with the simulation.
    const pendingRipples: { x: number; y: number; ink: THREE.Vector3 }[] = [];
    function handlePointerDown(event: PointerEvent) {
      if (event.pointerType === 'touch') return;
      const nx = event.clientX / window.innerWidth;
      const ny = 1 - event.clientY / window.innerHeight;
      pendingRipples.push({ x: nx, y: ny, ink: cursorPigment });
      lastMove = performance.now();
    }

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      renderer.setSize(width, height, false);
      initFramebuffers();
      // Interactive pages seed the ink pools; others show plain paper.
      if (interactive) seed();
      render();
    }

    // Paint the whole canvas with a marbled ink base coat, give it a gentle
    // flow, then advect it into filaments — so the reader lands into a fully
    // inked, serene scene they can then move through (never a blank canvas).
    function seed() {
      // A gentle initial flow field to pull broad pools into soft filaments.
      for (let i = 0; i < 8; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = CONFIG.splatForce * (0.1 + Math.random() * 0.08);
        splatVelocity(Math.random(), Math.random(), Math.cos(angle) * speed, Math.sin(angle) * speed);
      }

      // Leave real paper showing through. Pigment starts in broad pools around
      // the perimeter, with the quietest region behind the primary copy.
      // Pools frame the edges and keep the hero text column (left / centre)
      // quiet so the copy always stays legible.
      const pools = [
        [0.06, 0.09, INKS.sumi],
        [0.34, 0.05, INKS.ai],
        [0.64, 0.05, INKS.sumi],
        [0.91, 0.1, INKS.matsuba],
        [0.96, 0.34, INKS.sumi],
        [0.93, 0.6, INKS.ai],
        [0.95, 0.85, INKS.sumi],
        [0.7, 0.95, INKS.matsuba],
        [0.44, 0.97, INKS.shu],
        [0.12, 0.95, INKS.sumi],
        [0.03, 0.68, INKS.ai],
        [0.02, 0.34, INKS.sumi],
      ] as const;

      for (const [baseX, baseY, pigment] of pools) {
        for (let layer = 0; layer < 2; layer += 1) {
          const x = baseX + (Math.random() - 0.5) * 0.1;
          const y = baseY + (Math.random() - 0.5) * 0.1;
          const density = CONFIG.baseFillDensity * (0.48 + Math.random() * 0.42);
          const radius = layer === 0 ? 0.012 + Math.random() * 0.01 : 0.0025 + Math.random() * 0.004;
          splatDye(x, y, inkSplatColor(density, pigment), radius);
        }
      }

      // Let the flow marble the base coat before the first frame is shown.
      for (let i = 0; i < 72; i += 1) step(0.016);
    }

    resize();

    let raf = 0;
    let lastTime = performance.now();
    let autoTimer = 0;

    function frame(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.016666);
      lastTime = now;

      // Clicks send a ripple outward through the ink.
      while (pendingRipples.length > 0) {
        const r = pendingRipples.shift()!;
        ripple(r.x, r.y, r.ink);
      }

      // Moving the cursor pushes the existing ink (velocity) and trails a
      // little fresh dye — so it feels like moving a finger through paint.
      if (pointer.moved) {
        splatVelocity(pointer.x, pointer.y, pointer.dx, pointer.dy);
        splatDye(pointer.x, pointer.y, inkSplatColor(CONFIG.cursorDye, cursorPigment));
        pointer.moved = false;
      }

      // Auto-play: a slow wandering current keeps the painted canvas drifting
      // on its own, with the occasional faint ink bloom to replenish it.
      autoTimer += dt;
      const idle = now - lastMove > 2600;
      if (autoTimer > (idle ? 4.5 : 8.0)) {
        autoTimer = 0;
        const x = 0.5 + Math.cos(now * 0.00018) * 0.34 + (Math.random() - 0.5) * 0.2;
        const y = 0.5 + Math.sin(now * 0.00022) * 0.32 + (Math.random() - 0.5) * 0.2;
        const angle = Math.random() * Math.PI * 2;
        const speed = CONFIG.splatForce * 0.035;
        splatVelocity(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed);
        if (Math.random() < 0.35) {
          const pigment = Math.random() < 0.75 ? INKS.sumi : INKS.ai;
          splatDye(x, y, inkSplatColor(CONFIG.baseFillDensity * 0.38, pigment), 0.01);
        }
      }

      step(dt);
      render();
      raf = window.requestAnimationFrame(frame);
    }

    function handleVisibility() {
      if (document.hidden) {
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf && !reducedMotion.matches) {
        lastTime = performance.now();
        raf = window.requestAnimationFrame(frame);
      }
    }

    window.addEventListener('resize', resize, { passive: true });

    if (interactive && !reducedMotion.matches) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerdown', handlePointerDown, { passive: true });
      document.addEventListener('visibilitychange', handleVisibility);
      raf = window.requestAnimationFrame(frame);
    }
    // Non-interactive pages (and reduced motion) just show the static paper /
    // settled ink already painted by resize() — no live simulation loop.

    return () => {
      document.body.classList.remove('fluid-bg-active');
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      velocity?.dispose();
      dye?.dispose();
      pressure?.dispose();
      divergence?.dispose();
      curl?.dispose();
      Object.values(programs).forEach((p) => p.dispose());
      quad.geometry.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
