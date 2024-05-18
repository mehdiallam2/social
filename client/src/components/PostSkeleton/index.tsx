import styles from "./index.module.css";
import Skeleton from "../Skeleton";

const PostSkeleton = () => {
  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.user}>
          <Skeleton className={styles.avatar} />
          <div className={styles.userInfo}>
            <Skeleton className={styles.name} />
            <Skeleton className={styles.username} />
          </div>
        </div>
        <Skeleton className={styles.moreOptions} />
      </header>

      <Skeleton className={styles.body} />
      <Skeleton className={styles.postImage} />

      <footer className={styles.footer}>
        <Skeleton className={styles.action} />
        <Skeleton className={styles.action} />
        <Skeleton className={styles.action} />
        <Skeleton className={styles.action} />
      </footer>
    </article>
  );
};

export default PostSkeleton;
