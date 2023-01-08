import React, { useState } from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import Summary from "./project_details/summary/Summary";
import Tickets from "./project_details/tickets/Tickets";
import styles from "./_projects.module.scss";

function Details({ project, setCurrentTab }) {
  const navigation = ["Summary", "Tickets", "Activity", "Files", "Comments"];
  const [current, setCurrent] = useState("Summary");
  const handleCurrent = (e) => {
    setCurrent(e.target.id);
  };

  const Contents = () => {
    switch (current) {
      case "Summary":
        return <Summary project={project} />;
      case "Tickets":
        return <Tickets project={project} />;
      default:
        break;
    }
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.backBox}>
        <ChevronLeft />
        <div onClick={() => setCurrentTab("dashboard")}>Back</div>
      </div>

      <div className={styles.detailBox}>
        <div className={styles.title}>{project.name}</div>
        <div className={styles.navigation}>
          {navigation.map((nav) => (
            <div
              className={current == nav ? styles.currentTab : styles.tab}
              id={nav}
              onClick={(e) => handleCurrent(e)}
            >
              {nav}
            </div>
          ))}
        </div>
        <div>
          <Contents />
        </div>
      </div>
    </div>
  );
}

export default Details;
