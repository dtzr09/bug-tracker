import React, { useState } from "react";
import styles from "./_roles.module.scss";

function Roles({ data, setData, setStatus }) {
  const [selected, setSelected] = useState({
    Admin: false,
    Developer: false,
  });
  const [role, setRole] = useState("");

  const handleRoles = (e) => {
    setSelected({ [e.target.id]: !selected[e.target.id] });
    setRole(e.target.id);
  };

  const handleSubmit = () => {
    setData({ ...data, role: role });
    setStatus("profile-image");
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Choose Your Roles</div>
      <div
        id="Admin"
        className={selected["Admin"] ? styles.selectedBox : styles.box}
        onClick={(e) => handleRoles(e)}
      >
        <div
          id="Admin"
          className={styles.subtitle}
          onClick={(e) => handleRoles(e)}
        >
          Admin
        </div>
      </div>
      <div
        id="Developer"
        className={selected["Developer"] ? styles.selectedBox : styles.box}
        onClick={(e) => handleRoles(e)}
      >
        <div
          id="Developer"
          className={styles.subtitle}
          onClick={(e) => handleRoles(e)}
        >
          Developer
        </div>
      </div>
      {role ? (
        <div className={styles.buttonBox}>
          <button
            type="submit"
            className={styles.button}
            onClick={() => handleSubmit()}
          >
            OK
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Roles;
