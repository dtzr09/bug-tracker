import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getUserByName, getUsers } from "./users";

//adding project into projects document
export const addProject = async (data) => {
  const { id, name, description, members } = data;
  try {
    const docRef = await setDoc(doc(db, "projects", name), {
      id: id,
      name: name,
      description: description,
      members: members,
    });

    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

//assigning projects to individuals
export const addProjectsToIndividual = async (data) => {
  const { id, name, description, members } = data;
  if (members) {
    members.map((member) => {
      getUserByName(member).then(async (res) => {
        const email = res[0].email;
        const userRef = doc(db, "users", email);
        if (userRef) {
          const update = await updateDoc(userRef, {
            projects: arrayUnion(id),
          });
        }
      });
    });
  }
  //add all projects to the admin
  getUsers().then((res) =>
    res.map((user) => {
      if (user.role == "Admin") {
        const userRef = doc(db, "users", user.email);
        const update = updateDoc(userRef, {
          projects: arrayUnion(id),
        });
        return true;
      }
    })
  );
};

//getting all projects
export const getUserProjects = async (user) => {
  try {
    let result = [];
    const querySnapshot = await getDocs(collection(db, "projects")).then(
      (data) => {
        data.forEach((doc) => {
          const project = doc.data();
          const username = user.username;
          if (project.members.includes(username)) {
            result.push(doc.data());
          }
          if (user.role == "Admin") result.push(doc.data());
        });
      }
    );
    return result;
  } catch (error) {
    return null;
  }
};

export const getProjectsByID = async (id) => {
  try {
    let result = [];
    const querySnapshot = await getDocs(collection(db, "projects")).then(
      (data) => {
        data.forEach((doc) => {
          const project = doc.data();
          const project_id = project.id;
          if (project_id == id) {
            result.push(doc.data());
          }
        });
      }
    );
    return result[0];
  } catch (error) {
    return null;
  }
};
