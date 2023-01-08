import React, { useEffect, useState } from "react";
import { getUserProjects } from "../../../api/firebase/projects";
import Projects from "../../../components/projects/Projects";
import { getcurrentUser } from "../../../components/_shared/utils";
import styles from "./_manageProjects.module.scss";

function ManageProjects({ currentTab }) {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState();

  useEffect(() => {
    if (user)
      getUserProjects(user).then((res) => {
        setProjects(res);
      });
  }, [user]);

  useEffect(() => {
    getcurrentUser().then((res) => setUser(res));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.projectContainer}>
        <Projects projects={projects} currentTab={currentTab} />
      </div>
    </div>
  );
}

export default ManageProjects;
