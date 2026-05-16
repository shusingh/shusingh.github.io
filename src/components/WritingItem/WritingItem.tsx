import { Link } from 'react-router-dom';

import styles from './WritingItem.module.css';

interface WritingItemProps {
  to: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
}

export function WritingItem({ to, date, title, excerpt, readTime }: WritingItemProps) {
  return (
    <Link to={to} className={styles.item}>
      <div className={styles.date}>{date}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
      </div>
      <div className={styles.meta}>{readTime}</div>
    </Link>
  );
}
