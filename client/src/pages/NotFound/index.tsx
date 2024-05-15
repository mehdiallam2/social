import { Link } from "react-router-dom";
import styles from "./index.module.css";

function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heading}>We lost this page</h1>
        <p className={styles.paragraph}>
          We searched high and low but couldn’t find what you’re looking for. Let’s find a better
          place for you to go.
        </p>
        <Link className={styles.link} to="/">
          Go back home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
