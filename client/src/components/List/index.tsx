import styles from "./index.module.css";
import User from "@/components/User";
import { IUser } from "@/common/types";

function List({ users }: { users: IUser[] }) {
  return (
    <article className={styles.card}>
      {users?.length ? (
        <ul className={styles.info}>
          {users.map((user) => (
            <li key={user._id} className={styles.infoLine}>
              <User
                avatarURL={user.avatarURL}
                username={user.username}
                firstName={user.firstName}
                lastname={user.lastName}
              />
            </li>
          ))}
        </ul>
      ) : (
        <small className={styles.emptyMessage}>Follow to see here</small>
      )}
    </article>
  );
}

export default List;
