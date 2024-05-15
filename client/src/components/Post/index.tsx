import styles from "./index.module.css";
import { IPost, IUser } from "@/common/types";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Comment from "@/components/Comment";
import { useAuthStore } from "@/app/store";
import Avatar from "../ui/Avatar";
import { Link } from "react-router-dom";
import PostModal from "../PostModal";
import { useState } from "react";

interface Props {
  post: IPost;
  author: IUser;
}

function Post({ post, author }: Props) {
  const user = useAuthStore((state) => state.user);

  const isLiked = post.likes.includes(user!._id);

  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await axios.patch("http://localhost:3000/api/users/follow/" + id);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await axios.patch("http://localhost:3000/api/posts/like/" + id);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const isFollowing = post.userId.followers?.find((followingUser) => followingUser === user?._id);
  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.user}>
          <Avatar to={"/" + author?.username} src={author?.avatarURL} alt="" />
          <div className={styles.userInfo}>
            <small className={styles.name}>{author?.firstName + " " + author?.lastName}</small>
            <small className={styles.username}>{moment(post.createdAt).fromNow()}</small>
          </div>
        </div>
        <div className="">
          <button
            className={styles.profileImage}
            type="button"
            onClick={() => setShowPostModal(true)}
          >
            <svg
              className="x1lliihq x1n2onr6 x5n08af"
              aria-label="More Options"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>More Options</title>
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
          </button>
        </div>
      </header>

      {post?.content && <p className={styles.body}>{post?.content}</p>}
      {post?.media && <img className={styles.postImage} src={post?.media} alt="" />}

      <footer className={styles.footer}>
        <div className={styles.actionWrapper}>
          <button className={styles.action} type="button" onClick={() => mutation.mutate(post._id)}>
            <svg
              className={styles.actionIcon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={isLiked ? "red" : "currentColor"}
            >
              <path
                fill={isLiked ? "red" : "none"}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
          <small className={styles.count}>{post.likes.length}</small>
        </div>
        <div className={styles.actionWrapper}>
          <button className={styles.action} type="button">
            <svg
              className={styles.actionIcon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
          </button>
          <small className={styles.count}>{post.comments.length}</small>
        </div>
        <div className={styles.actionWrapper}>
          <button className={styles.action} type="button">
            <svg
              className={styles.actionIcon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
        <div className={styles.actionWrapper}>
          <button className={styles.action} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={styles.actionIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </button>
        </div>
      </footer>
      <div className={styles.comments}>
        {post.comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
      {showPostModal && (
        <PostModal
          post={post}
          isOpen={showPostModal}
          handleClose={() => setShowPostModal(!showPostModal)}
        />
      )}
    </article>
  );
}

export default Post;
