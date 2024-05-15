import styles from "./index.module.css";
import moment from "moment";
import { IComment } from "@/common/types";
import Avatar from "../ui/Avatar";

function Comment({ comment }: { comment: IComment }) {
  return (
    <div className={styles.comment}>
      <Avatar
        to={"/" + comment.userId.username}
        src={comment.userId.avatarURL}
        alt={comment.userId.username}
        size="small"
      />

      <div className={styles.commentInfo}>
        <div className="">
          <small className={styles.username}>{comment.userId.username}</small>{" "}
          <small className={styles.date}>{moment(comment.createdAt).fromNow(true)}</small>
        </div>
        <small className={styles.content}>{comment.content}</small>
      </div>
    </div>
  );
}

export default Comment;
