import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Overview from "./overview/Overview";
import style from "./_dashboard.module.scss";
import ManageProjects from "./manage_projects/ManageProjects";
import Details from "../../components/projects/Details";
import { getcurrentUser } from "../../components/_shared/utils";
import { getUserProjects } from "../../api/firebase/projects";

function Dashboard() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [projectID, setProject] = useState("");
  const [user, setUser] = useState();
  const [projects, setProjects] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    getcurrentUser().then((res) => setUser(res));
  }, []);

  useEffect(() => {
    if (user)
      getUserProjects(user).then((res) => {
        setProjects(res);
      });
  }, [user]);

  const ManageRoutes = () => {
    switch (currentTab) {
      case "dashboard":
        return (
          <Overview
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            setProject={setProject}
          />
        );
      case "manage-projects":
        return (
          <ManageProjects
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        );
      case "details":
        projects.map((data) => {
          if (data.id == projectID) setData(data);
        });
        return <Details project={data} setCurrentTab={setCurrentTab} />;
      default:
        break;
    }
  };

  return (
    <div className={style.dashboard}>
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className={style.contents}>
        <ManageRoutes />
      </div>
    </div>
  );
}

export default Dashboard;
