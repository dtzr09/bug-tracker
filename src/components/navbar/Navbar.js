import React, { useEffect, useState } from "react";
import styles from "./_navbar.module.scss";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getcurrentUser } from "../_shared/utils";

function Navbar(props) {
  const { currentTab, setCurrentTab } = props;
  const navigate = useNavigate();

  //to get and store the current user
  const [user, setUser] = useState();
  useEffect(() => {
    getcurrentUser().then((res) => setUser(res));
  }, []);

  const handleSignout = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        console.log("You are signed out.");
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRoute = (e) => {
    setCurrentTab(e.target.id);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.title}>
        Welcome, <span>{user ? `${user.username}` : null}</span>
      </div>
      <ul className={styles.ulBox}>
        <li
          className={
            currentTab == "dashboard" ? styles.selectedList : styles.list
          }
        >
          <a
            id="dashboard"
            onClick={(e) => handleRoute(e)}
            className={styles.link}
          >
            Dashboard
          </a>
        </li>
        {user && user.role.includes("Admin") ? (
          <>
            <li
              className={
                currentTab == "manage-projects"
                  ? styles.selectedList
                  : styles.list
              }
            >
              <a
                className={styles.link}
                id="manage-projects"
                onClick={(e) => handleRoute(e)}
              >
                Manage Projects
              </a>
            </li>
          </>
        ) : null}

        <li
          className={
            currentTab == "tickets" ? styles.selectedList : styles.list
          }
        >
          <a
            className={styles.link}
            id="tickets"
            onClick={(e) => handleRoute(e)}
          >
            Tickets
          </a>
        </li>
        <li
          className={
            currentTab == "profile" ? styles.selectedList : styles.list
          }
        >
          <a
            className={styles.link}
            id="profile"
            onClick={(e) => handleRoute(e)}
          >
            User Profile
          </a>
        </li>
      </ul>
      <span className={styles.span} />
      <button
        type="button"
        className={styles.button}
        onClick={() => handleSignout()}
      >
        Logout
      </button>
      {user ? (
        <div className={styles.subtitle}>Logged in as {user.role}</div>
      ) : null}
    </div>
  );
}

export default Navbar;
