import { Fragment } from 'react';

import styles from './MdxDiagrams.module.css';

type Direction = 'horizontal' | 'vertical';

interface DiagramFigureProps {
  children: React.ReactNode;
  caption?: string;
}

function DiagramFigure({ children, caption }: DiagramFigureProps) {
  return (
    <figure className={styles.figure}>
      {children}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

export interface FlowDiagramProps {
  nodes: string[];
  direction?: Direction;
  caption?: string;
}

export function FlowDiagram({
  nodes,
  direction = 'horizontal',
  caption,
}: FlowDiagramProps) {
  return (
    <DiagramFigure caption={caption}>
      <div className={styles.flow} data-direction={direction}>
        {nodes.map((node, index) => (
          <Fragment key={`${node}-${index}`}>
            <span className={styles.node}>{node}</span>
            {index < nodes.length - 1 ? <span className={styles.arrow}>to</span> : null}
          </Fragment>
        ))}
      </div>
    </DiagramFigure>
  );
}

export interface LoopDiagramProps {
  steps: string[];
  decision: string;
  yes: string;
  no: string;
  caption?: string;
}

export function LoopDiagram({ steps, decision, yes, no, caption }: LoopDiagramProps) {
  return (
    <DiagramFigure caption={caption}>
      <div className={styles.loopGrid}>
        <div className={styles.loopSteps}>
          {steps.map((step, index) => (
            <div className={styles.loopStep} key={`${step}-${index}`}>
              <span className={styles.stepNumber}>{index + 1}</span>
              <span className={styles.node}>{step}</span>
            </div>
          ))}
        </div>
        <div className={styles.loopDecision}>
          <p className={styles.decisionTitle}>{decision}</p>
          <p className={styles.decisionMeta}>yes: {yes}</p>
          <p className={styles.decisionMeta}>no: {no}</p>
        </div>
      </div>
    </DiagramFigure>
  );
}

export interface HubItem {
  title: string;
  body?: string;
}

export interface HubDiagramProps {
  left: HubItem;
  center: string;
  right: HubItem[];
  caption?: string;
}

export function HubDiagram({ left, center, right, caption }: HubDiagramProps) {
  return (
    <DiagramFigure caption={caption}>
      <div className={styles.hub}>
        <div className={styles.hubColumn}>
          <div className={styles.hubItem}>
            <p className={styles.hubTitle}>{left.title}</p>
            {left.body ? <p className={styles.hubBody}>{left.body}</p> : null}
          </div>
        </div>
        <div className={styles.hubCenter}>{center}</div>
        <div className={styles.hubColumn}>
          {right.map((item) => (
            <div className={styles.hubItem} key={item.title}>
              <p className={styles.hubTitle}>{item.title}</p>
              {item.body ? <p className={styles.hubBody}>{item.body}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </DiagramFigure>
  );
}

export interface SequenceEvent {
  side: 'left' | 'right';
  label: string;
}

export interface SequenceDiagramProps {
  leftTitle: string;
  rightTitle: string;
  events: SequenceEvent[];
  caption?: string;
}

export function SequenceDiagram({
  leftTitle,
  rightTitle,
  events,
  caption,
}: SequenceDiagramProps) {
  return (
    <DiagramFigure caption={caption}>
      <div className={styles.sequence}>
        <div className={styles.lane}>
          <div className={styles.laneTitle}>{leftTitle}</div>
          {events.map((event, index) =>
            event.side === 'left' ? (
              <div className={styles.event} data-side="left" key={`${event.label}-${index}`}>
                {event.label}
              </div>
            ) : (
              <span key={`${event.label}-${index}`} />
            )
          )}
        </div>
        <div className={styles.lane}>
          <div className={styles.laneTitle}>{rightTitle}</div>
          {events.map((event, index) =>
            event.side === 'right' ? (
              <div className={styles.event} data-side="right" key={`${event.label}-${index}`}>
                {event.label}
              </div>
            ) : (
              <span key={`${event.label}-${index}`} />
            )
          )}
        </div>
      </div>
    </DiagramFigure>
  );
}

export interface LayerGroup {
  title: string;
  items: string[];
}

export interface LayerDiagramProps {
  groups: LayerGroup[];
  caption?: string;
}

export function LayerDiagram({ groups, caption }: LayerDiagramProps) {
  return (
    <DiagramFigure caption={caption}>
      <div className={styles.layers}>
        {groups.map((group) => (
          <section className={styles.layer} key={group.title} aria-label={group.title}>
            <h4 className={styles.layerTitle}>{group.title}</h4>
            <ul className={styles.layerItems}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </DiagramFigure>
  );
}

export interface ComparisonColumn {
  title: string;
  eyebrow?: string;
  items: string[];
}

export interface ComparisonDiagramProps {
  left: ComparisonColumn;
  right: ComparisonColumn;
  caption?: string;
}

export function ComparisonDiagram({ left, right, caption }: ComparisonDiagramProps) {
  return (
    <DiagramFigure caption={caption}>
      <div className={styles.comparison}>
        {[left, right].map((column, index) => (
          <section
            className={styles.comparisonColumn}
            data-emphasis={index === 1 ? 'strong' : 'muted'}
            key={column.title}
            aria-label={column.title}
          >
            {column.eyebrow ? (
              <p className={styles.comparisonEyebrow}>{column.eyebrow}</p>
            ) : null}
            <h4 className={styles.comparisonTitle}>{column.title}</h4>
            <ul className={styles.comparisonItems}>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </DiagramFigure>
  );
}

export interface TimelineStep {
  title: string;
  body: string;
}

export interface TimelineDiagramProps {
  steps: TimelineStep[];
  caption?: string;
}

export function TimelineDiagram({ steps, caption }: TimelineDiagramProps) {
  return (
    <DiagramFigure caption={caption}>
      <ol className={styles.timeline}>
        {steps.map((step, index) => (
          <li className={styles.timelineStep} key={step.title}>
            <span className={styles.timelineMarker}>{index + 1}</span>
            <div>
              <h4 className={styles.timelineTitle}>{step.title}</h4>
              <p className={styles.timelineBody}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </DiagramFigure>
  );
}

export interface InterfaceSurfaceDiagramProps {
  title: string;
  statusItems: string[];
  workspaceTitle: string;
  workspaceItems: string[];
  evidenceItems: string[];
  actions: string[];
  caption?: string;
}

export function InterfaceSurfaceDiagram({
  title,
  statusItems,
  workspaceTitle,
  workspaceItems,
  evidenceItems,
  actions,
  caption,
}: InterfaceSurfaceDiagramProps) {
  return (
    <DiagramFigure caption={caption}>
      <div className={styles.surfaceShell}>
        <div className={styles.surfaceTopbar}>
          <span className={styles.surfaceDot} />
          <span className={styles.surfaceDot} />
          <span className={styles.surfaceDot} />
          <strong>{title}</strong>
        </div>
        <div className={styles.surfaceGrid}>
          <aside className={styles.surfaceRail} aria-label="Agent status">
            <p className={styles.surfaceLabel}>Status</p>
            {statusItems.map((item, index) => (
              <div className={styles.surfaceStatus} key={item}>
                <span className={styles.surfaceStatusIndex}>{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </aside>
          <section className={styles.surfaceWorkspace} aria-label={workspaceTitle}>
            <p className={styles.surfaceLabel}>{workspaceTitle}</p>
            {workspaceItems.map((item) => (
              <div className={styles.surfaceLine} key={item}>
                {item}
              </div>
            ))}
            <div className={styles.surfaceActions}>
              {actions.map((action) => (
                <span className={styles.surfaceAction} key={action}>
                  {action}
                </span>
              ))}
            </div>
          </section>
          <aside className={styles.surfaceEvidence} aria-label="Evidence">
            <p className={styles.surfaceLabel}>Evidence</p>
            {evidenceItems.map((item) => (
              <div className={styles.surfaceCitation} key={item}>
                {item}
              </div>
            ))}
          </aside>
        </div>
      </div>
    </DiagramFigure>
  );
}
