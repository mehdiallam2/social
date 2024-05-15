import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import { motion } from "framer-motion";

const variants = {
  close: {
    x: -300,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 100,
  },
};

function SettingsSidebar() {
  return (
    <motion.aside
      className={styles.aside}
      variants={variants}
      initial="open"
      animate="open"
      exit="close"
    >
      <header className={styles.asideHeader}>
        <h1 className={styles.asideHeading}>Settings</h1>
      </header>
      <nav className="">
        <div className={styles.group}>
          <small className={styles.groupHeading}>How you use instagram</small>
          <ul className={styles.groupList}>
            <li className={styles.groupItem}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.groupLink + " " + styles.active : styles.groupLink
                }
                to="/settings/edit"
              >
                <svg
                  className={styles.groupIcon}
                  aria-label="Profile"
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <title>Profile</title>
                  <circle
                    cx="12.004"
                    cy="12.004"
                    fill="none"
                    r="10.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  ></circle>
                  <path
                    d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  ></path>
                  <circle
                    cx="12.006"
                    cy="9.718"
                    fill="none"
                    r="4.109"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  ></circle>
                </svg>
                <span className={styles.groupName}>Edit Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.group}>
          <small className={styles.groupHeading}>Who can see your content</small>
          <ul className={styles.groupList}>
            <li className={styles.groupItem}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.groupLink + " " + styles.active : styles.groupLink
                }
                to="/settings/privacy"
              >
                <svg
                  className={styles.groupIcon}
                  aria-label="Account privacy"
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <title>Account privacy</title>
                  <path
                    d="M6.71 9.555h10.581a2.044 2.044 0 0 1 2.044 2.044v8.357a2.044 2.044 0 0 1-2.043 2.043H6.71a2.044 2.044 0 0 1-2.044-2.044V11.6A2.044 2.044 0 0 1 6.71 9.555Zm1.07 0V6.222a4.222 4.222 0 0 1 8.444 0v3.333"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span className={styles.groupName}>Account privacy</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </motion.aside>
  );
}

export default SettingsSidebar;
