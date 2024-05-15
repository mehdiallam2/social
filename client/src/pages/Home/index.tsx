import Feed from "@/features/Feed";
import styles from "./index.module.css";

function Home() {
  return (
    <main className={styles.home}>
      <Feed />
    </main>
  );
}

export default Home;
