import React, { useEffect, useState } from "react";
import { PersonX } from "react-bootstrap-icons";
import { getAdmins, getDevs, getUsers } from "../../api/firebase/users";
import styles from "./_projects.module.scss";

function ProjectForm({ form, setForm, members, setMembers }) {
  const [allUsers, setUsers] = useState();
  const [allAdmins, setAdmins] = useState();
  const [allDevs, setDevs] = useState();
  useEffect(() => {
    getUsers().then((res) => setUsers(res));
    getAdmins().then((res) => setAdmins(res));
    getDevs().then((res) => setDevs(res));
  }, []);

  //delete added team members
  const handleDelete = (e) => {
    if (members.includes(e.target.id)) {
      let res = members.filter((item) => item != e.target.id);
      setMembers(res);
    }
  };

  //add form to firebase db
  const handleForm = (e) => {
    if (e.target.id == "members") {
      if (members.includes(e.target.value)) return;
      setMembers([...members, e.target.value]);
    } else {
      setForm({ ...form, [e.target.id]: e.target.value });
    }
  };

  return (
    <form>
      <div class="form-group">
        <label for="name">Name of project</label>
        <input
          type="text"
          class="form-control"
          id="name"
          onChange={(e) => handleForm(e)}
        />
      </div>
      <div class="form-group">
        <label for="desc">Description</label>
        <textarea
          rows="2"
          type="text"
          class="form-control"
          id="description"
          onChange={(e) => handleForm(e)}
        />
      </div>
      <div class="form-group">
        <label for="members">Add Team Members</label>
        <select
          multiple
          class="form-control"
          id="members"
          onChange={(e) => handleForm(e)}
        >
          {allDevs && allDevs.map((user) => <option>{user.username}</option>)}
        </select>
      </div>
      {members.length > 0 ? (
        <div className={styles.members}>
          <div className={styles.header}>Added members: </div>
          <div className={styles.box}>
            {members &&
              members.map((member) => (
                <div className={styles.item}>
                  <div>{member}</div>
                  <PersonX
                    id={member}
                    className={styles.icon}
                    onClick={(e) => handleDelete(e)}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </form>
  );
}

export default ProjectForm;
