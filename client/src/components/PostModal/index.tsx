import { IPost } from "@/common/types";
import styles from "./index.module.css";
import Model from "../Modal";
import { cn } from "@/utils/cn";
import useUserQuery from "@/hooks/useUserQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useDeletePostMutation from "@/hooks/useDeletePostMutation";

interface Props {
  post?: IPost;
  isOpen: boolean;
  handleClose: () => void;
}

const PostModal = ({ post, isOpen, handleClose }: Props) => {
  const { data: user } = useUserQuery();
  console.log(post?.userId);
  const isFollowing = post?.userId.followers.includes(user?._id);

  const { mutate: deletePost } = useDeletePostMutation();

  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
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

  function handleDeleteClick() {
    deletePost(post!._id);
  }

  return (
    <Model isOpen={isOpen} handleClose={handleClose}>
      <ul className={styles.list}>
        {user?._id === post?.userId._id ? (
          <>
            <li className={styles.listItem}>
              <button
                className={cn(styles.listButton, styles.listButtonDanger)}
                type="button"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.listItem}>
              <button className={cn(styles.listButton, styles.listButtonDanger)} type="button">
                Report
              </button>
            </li>
            <li className={styles.listItem}>
              <button
                className={cn(styles.listButton, styles.listButtonDanger)}
                type="button"
                onClick={() => mutate(post!.userId._id)}
              >
                {!isFollowing ? "Follow" : "Unfollow"}
              </button>
            </li>
          </>
        )}
        <li className={styles.listItem}>
          <button className={styles.listButton} type="button">
            Add to favourites
          </button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.listButton} type="button">
            Go to post
          </button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.listButton} type="button">
            Copy link
          </button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.listButton} type="button">
            About this account
          </button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.listButton} type="button">
            Cancel
          </button>
        </li>
      </ul>
    </Model>
  );
};

export default PostModal;
