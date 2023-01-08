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
import { getProjectsByID } from "./projects";
import { getUserByName } from "./users";

//add the tickets to assigned users
export const addTicketToUser = async (props) => {
  const { ticketData } = props;
  const ticketId = ticketData.uid;
  const members = ticketData.members;
  try {
    if (members) {
      members.map((member) => {
        getUserByName(member).then(async (res) => {
          console.log(res);
          const email = res[0].email;
          const userRef = doc(db, "users", email);
          if (userRef) {
            const update = await updateDoc(userRef, {
              tickets: arrayUnion(ticketId),
            });
            console.log("Added Ticket To Users");
          }
        });
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

//add tickets to assigned projects
export const addTicketToProject = async (props) => {
  const { ticketData } = props;
  const ticketId = ticketData.uid;
  const projectId = ticketData.project_id;
  try {
    getProjectsByID(projectId).then(async (res) => {
      const projRef = doc(db, "projects", res.name);
      if (projRef) {
        const update = await updateDoc(projRef, {
          tickets: arrayUnion(ticketId),
        });
        console.log("Added Ticket to Project DB");
        return true;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTicketToDB = async (props) => {
  const { ticketData } = props;
  try {
    const ticketRef = await setDoc(doc(db, "tickets", ticketData.uid), {
      name: ticketData.name,
      uid: ticketData.uid,
      project_id: ticketData.project_id,
      project_name: ticketData.project_name,
      members: ticketData.members,
      comments: ticketData.comments,
      status: ticketData.status,
      category: ticketData.category,

      //added through edit (update)
      weights: "",
      labels: "",
      assignee: "",
    });
    console.log("Ticket added to DB ");
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

//adding a ticket to db "tickets"
export const addTicket = async (props) => {
  const { ticketData } = props;
  console.log(ticketData);
  try {
    if (ticketData) {
      if (
        addTicketToDB({
          ticketData: ticketData,
        }) &&
        addTicketToUser({
          ticketData: ticketData,
        }) &&
        addTicketToProject({
          ticketData: ticketData,
        })
      )
        console.log("Ticket Added.");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTicketsByProjectID = async (projectId) => {
  try {
    let res = [];
    const querySnapshot = await getDocs(collection(db, "tickets")).then(
      (data) => {
        data.forEach((doc) => {
          const result = doc.data();
          if (result && result.project_id == projectId) {
            res.push(result);
          }
        });
      }
    );
    return res;
  } catch (error) {
    return null;
  }
};

export const getTicketsByStatus = async (status) => {
  try {
    let res = [];
    const querySnapshot = await getDocs(collection(db, "tickets")).then(
      (data) => {
        data.forEach((doc) => {
          const result = doc.data();
          if (result && result.status == status) {
            res.push(result);
          }
        });
      }
    );
    return res;
  } catch (error) {
    return null;
  }
};
