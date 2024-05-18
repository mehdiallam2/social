import styles from "./index.module.css";
import Post from "@/components/Post";
import { useNavigate } from "react-router-dom";
import useFeedQuery from "@/hooks/useFeedQuery";
import PostSkeleton from "@/components/PostSkeleton";

function Feed() {
  const navigate = useNavigate();
  const { isPending, error, data: feed } = useFeedQuery();

  if (error?.response?.status === 401) navigate("/signin");
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.feed}>
      <div className={styles.container}>
        {!isPending ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : feed?.length === 0 ? (
          <p className={styles.noPosts}>No posts found</p>
        ) : (
          feed && feed?.map((post, index) => <Post key={index} post={post} author={post.userId} />)
        )}
      </div>
    </div>
  );
}

export default Feed;
