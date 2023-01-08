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

//adding user
export const addUser = async (data) => {
  const { username, email, password, uid, projects, role, profile_url } = data;
  try {
    const docRef = await setDoc(doc(db, "users", email), {
      username: username,
      email: email,
      password: password,
      role: role,
      uid: uid,
      projects: projects,
      profile_url: profile_url,
    });

    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

//getting one user
export const getUser = async (userId) => {
  try {
    let res = [];
    const querySnapshot = await getDocs(collection(db, "users")).then(
      (data) => {
        data.forEach((doc) => {
          const result = doc.data();
          if (result && result.uid == userId) {
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

//getting user by name
export const getUserByName = async (name) => {
  try {
    let res = [];
    const querySnapshot = await getDocs(collection(db, "users")).then(
      (data) => {
        data.forEach((doc) => {
          const result = doc.data();
          if (result && result.username == name) {
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

export const updateUser = async (name) => {
  try {
  } catch (error) {}
};

//getting all users
export const getUsers = async () => {
  try {
    let result = [];
    const querySnapshot = await getDocs(collection(db, "users")).then(
      (data) => {
        data.forEach((doc) => {
          result.push(doc.data());
        });
      }
    );
    return result;
  } catch (error) {
    return null;
  }
};

//getting all admins
export const getAdmins = async () => {
  try {
    let result = [];
    const querySnapshot = await getDocs(collection(db, "users")).then(
      (data) => {
        data.forEach((doc) => {
          const info = doc.data();
          if (info.role == "Admin") result.push(info);
        });
      }
    );
    return result;
  } catch (error) {
    return null;
  }
};

//getting all devs
export const getDevs = async () => {
  try {
    let result = [];
    const querySnapshot = await getDocs(collection(db, "users")).then(
      (data) => {
        data.forEach((doc) => {
          const info = doc.data();
          if (info.role == "Developer") result.push(info);
        });
      }
    );
    return result;
  } catch (error) {
    return null;
  }
};
