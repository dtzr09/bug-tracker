import React from "react";
import style from "./_projects.module.scss";

function Projects({ projects, currentTab, setCurrentTab, setProject }) {
  const handleClick = (e) => {
    setProject(e.target.id);
    setCurrentTab("details");
  };
  return (
    <div className={style.container}>
      <div className={style.gridContainer}>
        <div className={style.title}>Projects</div>
        <div className={style.title}>Description</div>
        <div className={style.title}>Team</div>
      </div>
      <div className={style.span}></div>

      {projects ? (
        <div className={style.itemContainer}>
          {projects &&
            projects.map((project) => (
              <>
                <div className={style.item}>{project.name}</div>
                <div className={style.item}>{project.description}</div>
                <div className={style.item}>
                  <div className={style.memberContainer}>
                    {project.members.map((member) => (
                      <div className={style.name}>{member}</div>
                    ))}
                  </div>
                </div>
                {currentTab == "manage-projects" ? (
                  <div className={style.link}>manage</div>
                ) : (
                  <div
                    className={style.link}
                    id={project.id}
                    onClick={(e) => handleClick(e)}
                  >
                    details
                  </div>
                )}
              </>
            ))}
        </div>
      ) : null}
    </div>
  );
}

export default Projects;
