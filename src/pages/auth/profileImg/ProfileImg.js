import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../api/firebase/users";
import { uploadFile } from "../../../components/_shared/utils";
import { storage } from "../../../firebaseConfig";

function ProfileImg({ data, setData }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [fileobj, setFile] = useState(
    "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
  );

  const handleFileUpload = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const fileStatus = e.target.files && e.target.files[0];
    const fileData = e.target.files[0];

    if (fileStatus) {
      const profileRef = ref(storage, `/profile-images/${data.username}`);
      const blob = new Blob([fileData], { type: fileData.type });
      const file = new File([blob], fileData.name, { type: fileData.type });
      const metadata = {
        contentType: fileData.type,
        contentSize: fileData.size,
      };
      uploadBytesResumable(profileRef, file, metadata).then(() => {
        getDownloadURL(profileRef).then((url) => {
          setFile(url);
          setData({ ...data, profile_url: url });
        });
      });
    }
  };

  const submitForm = () => {
    addUser(data) ? navigate(`${data.uid}/dashboard`) : console.log("error");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "18px",
      }}
    >
      <div style={{ fontSize: "22px" }}>Change your profile image</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          class="d-flex justify-content-center mb-4"
          style={{
            maxWidth: "400px",
            maxHeight: "400px",
          }}
        >
          <img
            src={fileobj}
            class="rounded-square"
            alt="example placeholder"
            style={{
              objectFit: "contain",
              overflow: "hidden",
              objectPosition: "50% 50%",
            }}
            onClick={handleFileUpload}
          />
        </div>
        <input
          ref={inputRef}
          onChange={handleFileChange}
          type="file"
          class="form-control d-none"
          id="profile-img"
        />
      </div>
      <button class="btn btn-primary" onClick={() => submitForm()}>
        Skip
      </button>
    </div>
  );
}

export default ProfileImg;
