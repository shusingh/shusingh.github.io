import styles from './PhotoFrame.module.css';

interface PhotoFrameProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

export function PhotoFrame({
  src,
  alt,
  width = 1080,
  height = 1080,
  placeholder = 'your photo here',
}: PhotoFrameProps) {
  if (src) {
    return (
      <figure className={styles.frame}>
        <img
          className={styles.image}
          src={src}
          alt={alt ?? ''}
          width={width}
          height={height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </figure>
    );
  }

  return (
    <div className={styles.frame} role="img" aria-label={placeholder}>
      <span className={styles.placeholder} aria-hidden="true">
        {placeholder}
      </span>
      <span className={styles.dashed} aria-hidden="true" />
    </div>
  );
}
