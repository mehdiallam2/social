import styles from "./index.module.css";
import Post from "@/components/Post";
import { useNavigate } from "react-router-dom";
import useFeedQuery from "@/hooks/useFeedQuery";
import { cn } from "@/utils/cn";

function Feed() {
  const navigate = useNavigate();
  const { isPending, error, data: feed } = useFeedQuery();

  if (isPending) return "Loading...";

  if (error?.response?.status === 401) navigate("/signin");
  if (error) return "An error has occurred: " + error.message;

  console.log(feed);

  return (
    <div className={styles.feed}>
      <div className={styles.container}>
        {feed && feed.map((post, index) => <Post key={index} post={post} author={post.userId} />)}
      </div>
    </div>
  );
}

export default Feed;
