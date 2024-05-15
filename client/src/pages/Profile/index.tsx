import styles from "./index.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser } from "@/common/types";
import Button from "@/components/ui/Button";

import Modal from "@/components/Modal";
import { useState } from "react";
import useUserQuery from "@/hooks/useUserQuery";
import Post from "@/components/Post";
import User from "@/components/User";
import PostModal from "@/components/PostModal";

function Profile() {
  const params = useParams();
  const { data: user } = useUserQuery();

  const {
    isPending,
    error,
    data: profile,
  } = useQuery<IUser>({
    queryKey: ["profile", params.username],
    queryFn: () => axios("/users/profile/" + params.username).then((response) => response.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await axios.patch("http://localhost:3000/api/users/follow/" + id);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const isFollowing = profile?.followers.find((followingUser) => followingUser._id === user?._id);

  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <main className={styles.profile}>
      <section className={styles.hero}>
        <div className={styles.heroContainer + " container"}>
          <header className={styles.header}>
            <img className={styles.avatar} src={profile?.avatarURL} alt="" />
            <div className={styles.userInfo}>
              <div className={styles.edit}>
                <h1 className={styles.username}>{profile?.username}</h1>
                {profile?.username === user?.username ? (
                  <Link to="/settings/edit">
                    <Button variant="dark" size="small">
                      Edit Profile
                    </Button>
                  </Link>
                ) : (
                  <Button variant="dark" size="small" onClick={() => mutation.mutate(profile._id)}>
                    {!isFollowing ? "Follow" : "Unfollow"}
                  </Button>
                )}
              </div>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.count}>{profile?.posts.length}</span> posts
                </li>
                <li className={styles.listItem}>
                  <button
                    onClick={() => setOpenFollowing(!openFollowing)}
                    className={styles.listLink}
                  >
                    <span className={styles.count}>{profile?.following.length}</span> following
                  </button>
                </li>
                <li className={styles.listItem}>
                  <button
                    onClick={() => setOpenFollowers(!openFollowers)}
                    className={styles.listLink}
                  >
                    <span className={styles.count}>{profile?.followers.length}</span> followers
                  </button>
                </li>
              </ul>
              <small className={styles.name}>{profile?.firstName + " " + profile?.lastName}</small>
              <p className={styles.bio}>{profile?.bio}</p>
            </div>
          </header>
          <div className={styles.grid}>
            {profile?.posts.map((post, index) => (
              <Post key={index} post={post} author={profile} />
            ))}
          </div>
          {openFollowers && (
            <Modal isOpen={openFollowers} handleClose={() => setOpenFollowers(!openFollowers)}>
              {profile?.followers.length ? (
                <ul className={styles.info}>
                  {profile.followers.map((user) => (
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
            </Modal>
          )}

          {openFollowing && (
            <Modal isOpen={openFollowing} handleClose={() => setOpenFollowing(!openFollowing)}>
              {profile?.following.length ? (
                <ul className={styles.info}>
                  {profile.following.map((user) => (
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
            </Modal>
          )}
        </div>
      </section>
    </main>
  );
}

export default Profile;
