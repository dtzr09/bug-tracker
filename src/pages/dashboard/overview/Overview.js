import React, { useEffect, useState } from "react";
import style from "./_overview.module.scss";
import { v4 as uuidv4 } from "uuid";
import {
  addProject,
  addProjectsToIndividual,
  getUserProjects,
} from "../../../api/firebase/projects";
import { getcurrentUser } from "../../../components/_shared/utils";
import Projects from "../../../components/projects/Projects";
import ProjectForm from "../../../components/projects/ProjectForm";
import { projectForm } from "../../../components/_shared/constants";
import Alert from "../../../components/alert/Alert";

function Overview({ currentTab, setCurrentTab, setProject }) {
  const [user, setUser] = useState();
  useEffect(() => {
    getcurrentUser().then((res) => setUser(res));
  }, []);

  const [form, setForm] = useState(projectForm);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState();
  const [alertStatus, setStatus] = useState({ check: false, status: "" });
  const toggleAlertVisibility = () => {
    setStatus({ check: false, status: "" });
  };

  useEffect(() => {
    const timeoutId = setTimeout(toggleAlertVisibility, 5000);
  }, [alertStatus.check]);

  useEffect(() => {
    if (user)
      getUserProjects(user).then((res) => {
        setProjects(res);
      });
  }, [user]);

  useEffect(() => {
    setForm({ ...form, members: members, id: uuidv4() });
  }, [members]);

  const saveForm = () => {
    const { name, description, members } = form;
    if (name && description && members) {
      //need to add projects to individual users (users db)
      //add projects to projects db
      if (addProject(form) && addProjectsToIndividual(form)) {
        setStatus({ check: true, status: "success" });
        resetForm();
      }
    } else {
      setStatus({ check: true, status: "error" });
      setError("Something went wrong, please refresh and try again.");
    }
  };

  const resetForm = () => {
    setForm({ id: "", name: "", description: "", members: [] });
    setMembers([]);
  };

  return (
    <div className={style.overview}>
      <div className={style.container}>
        <div className={style.box}>
          <div className={style.subBox}>
            <div className={style.header}>Projects</div>
            {projects ? (
              <div className={style.subheader}>
                ( Entities: {projects.length} )
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className={style.button}
            data-toggle="modal"
            data-target="#form"
          >
            New Project
          </button>
        </div>

        <div className={style.projectContainer}>
          <Projects
            projects={projects}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            setProject={setProject}
          />
        </div>
      </div>

      {/* Modal */}
      <div
        class="modal fade"
        id="form"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Create a new project
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ProjectForm
                members={members}
                setMembers={setMembers}
                form={form}
                setForm={setForm}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => resetForm()}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => saveForm()}
                disabled={members.length > 0 ? false : true}
                data-dismiss="modal"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {alertStatus.check ? (
        <div className={style.alert}>
          <Alert name="Project" status={alertStatus.status} errorMsg={error} />
        </div>
      ) : null}
    </div>
  );
}

export default Overview;
