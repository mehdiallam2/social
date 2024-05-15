import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import useUserQuery from "@/hooks/useUserQuery";
import Avatar from "../ui/Avatar";
import Logo from "../icons/Logo";
import HomeIcon from "../icons/HomeIcon";
import SearchIcon from "../icons/SearchIcon";
import HeartIcon from "../icons/HeartIcon";
import PlusSquareIcon from "../icons/PlusSquareIcon";
import CompassIcon from "../icons/CompassIcon";
import VideoIcon from "../icons/VideoIcon";
import PaperAirplaneIcon from "../icons/PaperAirplaneIcon";
import { cn } from "@/utils/cn";
import ThreeBarsIcon from "../icons/ThreeBarsIcon";
import { useAuthStore } from "@/app/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const containerVariants = {
  close: {
    width: "4.5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "15rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const { data: user } = useUserQuery();
  const {
    mutate: signout,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => await axios.post("/auth/signout"),
    onSuccess(data, variables, context) {
      // navigate("/signin");
    },
  });

  return (
    <motion.aside
      className={styles.aside}
      variants={containerVariants}
      initial="close"
      animate={containerControls}
    >
      <header className={styles.asideHeader}>
        <button className={styles.logo} onClick={() => handleOpenClose()}>
          <Logo className={styles.logoIcon} />
        </button>
      </header>
      <nav className={styles.navigation}>
        <NavLink className={({ isActive }) => cn(styles.link, isActive && styles.active)} to="/">
          <HomeIcon className={styles.icon} />
          <span className={styles.label}>Home</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => cn(styles.link, isActive && styles.active)}
          to="/search"
        >
          <SearchIcon className={styles.icon} />
          <span className={styles.label}>Search</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => cn(styles.link, isActive && styles.active)}
          to="/explore"
        >
          <CompassIcon className={styles.icon} />
          <span className={styles.label}>Explore</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => cn(styles.link, isActive && styles.active)}
          to="/reels"
        >
          <VideoIcon className={styles.icon} />
          <span className={styles.label}>Reels</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => cn(styles.link, isActive && styles.active)}
          to="/messages"
        >
          <PaperAirplaneIcon className={styles.icon} />
          <span className={styles.label}>Messages</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => cn(styles.link, isActive && styles.active)}
          to="/notifications"
        >
          <HeartIcon className={styles.icon} />
          <span className={styles.label}>Notifications</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => cn(styles.link, isActive && styles.active)}
          to="/newpost"
        >
          <PlusSquareIcon className={styles.icon} />
          <span className={styles.label}>New Post</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => cn(styles.link, isActive && styles.active)}
          to={"/" + user?.username}
        >
          <Avatar src={user?.avatarURL} size="small" />
          <span className={styles.label}>Profile</span>
        </NavLink>
      </nav>
      <div className={styles.dropdown} tabIndex={0}>
        <button className={styles.link}>
          <ThreeBarsIcon className={styles.icon} />
          <span className={styles.label}>Home</span>
        </button>
        <ul className={styles.dropdownContent}>
          <li className={styles.groupItem}>
            <Link className={styles.groupLink} to={"settings/edit"}>
              <svg
                className={styles.groupLinkIcon}
                aria-label="Settings"
                fill="currentColor"
                role="img"
                viewBox="0 0 24 24"
              >
                <title>Settings</title>
                <circle
                  cx="12"
                  cy="12"
                  fill="none"
                  r="8.635"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></circle>
                <path
                  d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              <span className={styles.groupLinkName}>Settings</span>
            </Link>
          </li>
          <li className={styles.groupItem}>
            <button className={styles.groupLink} type="button">
              <svg
                className={styles.groupLinkIcon}
                aria-label="Theme icon"
                fill="currentColor"
                height="18"
                role="img"
                viewBox="0 0 24 24"
                width="18"
              >
                <title>Theme icon</title>
                <path d="M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z"></path>
              </svg>
              <span className={styles.groupLinkName}>Switch Theme</span>
            </button>
          </li>
          <li className={styles.groupItem}>
            <button className={styles.groupLink} type="button" onClick={() => signout()}>
              <svg
                className={styles.groupLinkIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              <span className={styles.groupLinkName}>Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
