import { Link, NavLink } from "react-router-dom";
import styles from "./index.module.css";
import useHideHeader from "../../hooks/useHideHeader";
import { switchTheme } from "@/features/settings/settingsSlice";
import { useAuthStore } from "@/app/store";
import Avatar from "../ui/Avatar";
import useUserQuery from "@/hooks/useUserQuery";

function Header() {
  const { data: user } = useUserQuery();

  const signOut = useAuthStore((state) => state.signOut);
  const { isHidden } = useHideHeader();

  function logOut() {
    signOut();
  }

  const linkState = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
    isPending ? styles.pending : isActive ? styles.active : "";

  return (
    <header className={styles.header + " " + (isHidden && styles.hidden)}>
      <nav className={styles.container + " container"}>
        <Link className={styles.logo} to={"/"}>
          <svg
            className={styles.logoIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47 40"
            fill="none"
          >
            <path
              fill="var(--primary)"
              d="M23.5 6.5C17.5 6.5 13.75 9.5 12.25 15.5C14.5 12.5 17.125 11.375 20.125 12.125C21.8367 12.5529 23.0601 13.7947 24.4142 15.1692C26.6202 17.4084 29.1734 20 34.75 20C40.75 20 44.5 17 46 11C43.75 14 41.125 15.125 38.125 14.375C36.4133 13.9471 35.1899 12.7053 33.8357 11.3308C31.6297 9.09158 29.0766 6.5 23.5 6.5ZM12.25 20C6.25 20 2.5 23 1 29C3.25 26 5.875 24.875 8.875 25.625C10.5867 26.0529 11.8101 27.2947 13.1642 28.6693C15.3702 30.9084 17.9234 33.5 23.5 33.5C29.5 33.5 33.25 30.5 34.75 24.5C32.5 27.5 29.875 28.625 26.875 27.875C25.1633 27.4471 23.9399 26.2053 22.5858 24.8307C20.3798 22.5916 17.8266 20 12.25 20Z"
            />
          </svg>
        </Link>
        {/* tabIndex={0} is for :focus-within to work on safari */}
        <div className={styles.dropdown} tabIndex={0}>
          <button className={styles.profileImage} type="button">
            {/* <img className={styles.profileImage} src={user?.avatarURL} /> */}
            <Avatar size="small" src={user?.avatarURL} />
          </button>
          <ul className={styles.dropdownContent}>
            <li className={styles.groupItem}>
              <Link className={styles.groupLink} to={`/${user?.username}`}>
                <svg
                  className={styles.groupLinkIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className={styles.groupLinkName}>Profile</span>
              </Link>
            </li>
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
              <button className={styles.groupLink} type="button" onClick={() => switchTheme()}>
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
              <button className={styles.groupLink} type="button" onClick={logOut}>
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
      </nav>
    </header>
  );
}

export default Header;
