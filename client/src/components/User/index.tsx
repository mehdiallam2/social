import styles from "./index.module.css";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

type Props = {
  avatarURL: string;
  username: string;
  firstName: string;
  lastname: string;
};

const User = ({ avatarURL, username, firstName, lastname }: Props) => {
  return (
    <header className={styles.header}>
      <Avatar to={"/" + username} src={avatarURL} />
      <div className={styles.names}>
        <span className={styles.username}>{username}</span>
        <small className={styles.name}>{firstName + " " + lastname}</small>
      </div>
      <Button className={styles.button} variant="light" size="small">
        Follow
      </Button>
    </header>
  );
};

export default User;
