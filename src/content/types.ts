import type { ComponentType } from 'react';

export interface WritingFrontmatter {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  draft?: boolean;
}

export interface WorkStat {
  number: string;
  label: string;
}

export interface WorkDiagramSpec {
  nodes: string[];
  separator?: string;
  separators?: string[];
  caption?: string;
}

export interface WorkFrontmatter {
  title: string;
  slug: string;
  eyebrow: string;
  description: string;
  tech: string[];
  date: string;
  stat?: WorkStat;
  diagram?: WorkDiagramSpec;
  featured?: boolean;
  order?: number;
  draft?: boolean;
}

export type ProjectKind = 'personal' | 'contribution';
export type ProjectStatus = 'active' | 'merged' | 'open' | 'closed' | 'released' | 'wip';

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  kind: ProjectKind;
  link: string;
  repo?: string;
  liveUrl?: string;
  upstream?: string;
  prUrl?: string;
  prNumber?: number;
  tags: string[];
  year: number;
  status?: ProjectStatus;
  stat?: WorkStat;
  diagram?: WorkDiagramSpec;
  featured?: boolean;
  order?: number;
  draft?: boolean;
}

export interface WritingEntry {
  frontmatter: WritingFrontmatter;
  Component: ComponentType;
}

export interface WorkEntry {
  frontmatter: WorkFrontmatter;
  Component: ComponentType;
}

export interface ProjectEntry {
  frontmatter: ProjectFrontmatter;
  Component: ComponentType;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseDiagram(value: unknown, source: string): WorkDiagramSpec | undefined {
  if (value === undefined) return undefined;
  if (!isObject(value)) {
    throw new Error(`[${source}] frontmatter.diagram must be an object`);
  }
  const { nodes, separator, separators, caption } = value;
  if (!isStringArray(nodes) || nodes.length === 0) {
    throw new Error(`[${source}] frontmatter.diagram.nodes must be a non-empty string array`);
  }
  if (separator !== undefined && typeof separator !== 'string') {
    throw new Error(`[${source}] frontmatter.diagram.separator must be a string`);
  }
  if (separators !== undefined && !isStringArray(separators)) {
    throw new Error(`[${source}] frontmatter.diagram.separators must be a string array`);
  }
  if (caption !== undefined && typeof caption !== 'string') {
    throw new Error(`[${source}] frontmatter.diagram.caption must be a string`);
  }
  return { nodes, separator, separators, caption };
}

function parseStat(value: unknown, source: string): WorkStat | undefined {
  if (value === undefined) return undefined;
  if (!isObject(value)) {
    throw new Error(`[${source}] frontmatter.stat must be an object`);
  }
  const { number, label } = value;
  if (typeof number !== 'string' || typeof label !== 'string') {
    throw new Error(`[${source}] frontmatter.stat requires string {number, label}`);
  }
  return { number, label };
}

function requireString(value: unknown, source: string, field: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`[${source}] frontmatter.${field} must be a non-empty string`);
  }
  return value;
}

export function parseWritingFrontmatter(value: unknown, source: string): WritingFrontmatter {
  if (!isObject(value)) {
    throw new Error(`[${source}] frontmatter must be an object`);
  }
  const title = requireString(value.title, source, 'title');
  const date = requireString(value.date, source, 'date');
  const slug = requireString(value.slug, source, 'slug');
  const excerpt = requireString(value.excerpt, source, 'excerpt');
  const readTime = requireString(value.readTime, source, 'readTime');
  const tags = value.tags === undefined ? [] : value.tags;
  if (!isStringArray(tags)) {
    throw new Error(`[${source}] frontmatter.tags must be a string array`);
  }
  const draft = value.draft;
  if (draft !== undefined && typeof draft !== 'boolean') {
    throw new Error(`[${source}] frontmatter.draft must be a boolean`);
  }
  return { title, date, slug, excerpt, readTime, tags, draft };
}

export function parseWorkFrontmatter(value: unknown, source: string): WorkFrontmatter {
  if (!isObject(value)) {
    throw new Error(`[${source}] frontmatter must be an object`);
  }
  const title = requireString(value.title, source, 'title');
  const slug = requireString(value.slug, source, 'slug');
  const eyebrow = requireString(value.eyebrow, source, 'eyebrow');
  const description = requireString(value.description, source, 'description');
  const date = requireString(value.date, source, 'date');
  const tech = value.tech;
  if (!isStringArray(tech)) {
    throw new Error(`[${source}] frontmatter.tech must be a string array`);
  }
  const stat = parseStat(value.stat, source);
  const diagram = parseDiagram(value.diagram, source);
  const featured = value.featured;
  if (featured !== undefined && typeof featured !== 'boolean') {
    throw new Error(`[${source}] frontmatter.featured must be a boolean`);
  }
  const draft = value.draft;
  if (draft !== undefined && typeof draft !== 'boolean') {
    throw new Error(`[${source}] frontmatter.draft must be a boolean`);
  }
  const order = value.order;
  if (order !== undefined && typeof order !== 'number') {
    throw new Error(`[${source}] frontmatter.order must be a number`);
  }
  return {
    title,
    slug,
    eyebrow,
    description,
    tech,
    date,
    stat,
    diagram,
    featured,
    order,
    draft,
  };
}

function parseKind(value: unknown, source: string): ProjectKind {
  if (value === 'personal' || value === 'contribution') return value;
  throw new Error(`[${source}] frontmatter.kind must be 'personal' or 'contribution'`);
}

function parseStatus(value: unknown, source: string): ProjectStatus | undefined {
  if (value === undefined) return undefined;
  if (
    value === 'active' ||
    value === 'merged' ||
    value === 'open' ||
    value === 'closed' ||
    value === 'released' ||
    value === 'wip'
  ) {
    return value;
  }
  throw new Error(
    `[${source}] frontmatter.status must be one of 'active' | 'merged' | 'open' | 'closed' | 'released' | 'wip'`
  );
}

export function parseProjectFrontmatter(value: unknown, source: string): ProjectFrontmatter {
  if (!isObject(value)) {
    throw new Error(`[${source}] frontmatter must be an object`);
  }
  const title = requireString(value.title, source, 'title');
  const slug = requireString(value.slug, source, 'slug');
  const description = requireString(value.description, source, 'description');
  const link = requireString(value.link, source, 'link');
  const kind = parseKind(value.kind, source);
  const repo = value.repo;
  if (repo !== undefined && typeof repo !== 'string') {
    throw new Error(`[${source}] frontmatter.repo must be a string`);
  }
  const liveUrl = value.liveUrl;
  if (liveUrl !== undefined && typeof liveUrl !== 'string') {
    throw new Error(`[${source}] frontmatter.liveUrl must be a string`);
  }
  const upstream = value.upstream;
  if (upstream !== undefined && typeof upstream !== 'string') {
    throw new Error(`[${source}] frontmatter.upstream must be a string`);
  }
  const prUrl = value.prUrl;
  if (prUrl !== undefined && typeof prUrl !== 'string') {
    throw new Error(`[${source}] frontmatter.prUrl must be a string`);
  }
  const prNumber = value.prNumber;
  if (prNumber !== undefined && typeof prNumber !== 'number') {
    throw new Error(`[${source}] frontmatter.prNumber must be a number`);
  }
  const tags = value.tags === undefined ? [] : value.tags;
  if (!isStringArray(tags)) {
    throw new Error(`[${source}] frontmatter.tags must be a string array`);
  }
  const year = value.year;
  if (typeof year !== 'number' || !Number.isFinite(year)) {
    throw new Error(`[${source}] frontmatter.year must be a number`);
  }
  const status = parseStatus(value.status, source);
  const stat = parseStat(value.stat, source);
  const diagram = parseDiagram(value.diagram, source);
  const featured = value.featured;
  if (featured !== undefined && typeof featured !== 'boolean') {
    throw new Error(`[${source}] frontmatter.featured must be a boolean`);
  }
  const order = value.order;
  if (order !== undefined && typeof order !== 'number') {
    throw new Error(`[${source}] frontmatter.order must be a number`);
  }
  const draft = value.draft;
  if (draft !== undefined && typeof draft !== 'boolean') {
    throw new Error(`[${source}] frontmatter.draft must be a boolean`);
  }
  return {
    title,
    slug,
    description,
    kind,
    link,
    repo,
    liveUrl,
    upstream,
    prUrl,
    prNumber,
    tags,
    year,
    status,
    stat,
    diagram,
    featured,
    order,
    draft,
  };
}
