import React from "react";
import styles from "./_summary.module.scss";

function Summary({ project }) {
  return (
    <div className={styles.summary}>
      <div className={styles.subBox}>
        <div className={styles.subtitle}>Project Description</div>
        <div className={styles.words}>
          {project.description ? project.description : "- - NIL - - "}
        </div>
      </div>
      <div className={styles.subBox}>
        <div className={styles.subtitle}>Members</div>
        <div className={styles.memberBox}>
          {project.members.map((member) => (
            <div className={styles.words}>{member}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Summary;
