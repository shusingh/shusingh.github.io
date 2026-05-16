import { Fragment } from 'react';

import styles from './WorkDiagram.module.css';

export interface WorkDiagramProps {
  nodes: string[];
  separator?: string;
  separators?: string[];
  caption?: string;
}

export function WorkDiagram({ nodes, separator = '→', separators, caption }: WorkDiagramProps) {
  if (nodes.length === 0) {
    return null;
  }

  return (
    <div className={styles.diagram} aria-hidden="true">
      <div className={styles.flow}>
        {nodes.map((node, index) => {
          const sep = separators?.[index] ?? separator;
          return (
            <Fragment key={`${node}-${index}`}>
              <span className={styles.node}>{node}</span>
              {index < nodes.length - 1 ? <span className={styles.separator}>{sep}</span> : null}
            </Fragment>
          );
        })}
      </div>
      {caption ? <div className={styles.caption}>{caption}</div> : null}
    </div>
  );
}
