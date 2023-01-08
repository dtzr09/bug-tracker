import { getUser } from "../../api/firebase/users";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebaseConfig";

export const getcurrentUser = async () => {
  const userId = window.location.pathname.split("/")[1];
  const res = await getUser(userId);
  return res[0];
};

export const convertString = (str) => {
  return str.replace(/\s+/g, "-").toLowerCase();
};
