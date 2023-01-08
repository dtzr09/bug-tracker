import React, { useState } from "react";
import SignIn from "../../components/auth/SignIn";
import SignUp from "../../components/auth/SignUp";
import Roles from "../../components/roles/Roles";
import { userForm } from "../../components/_shared/constants";
import ProfileImg from "./profileImg/ProfileImg";
import styles from "./_auth.module.scss";

function AuthPage() {
  const [status, setStatus] = useState("login");
  const [data, setData] = useState(userForm);

  const HandleRoutes = () => {
    switch (status) {
      case "login":
        return <SignIn setStatus={setStatus} />;
      case "signUp":
        return <SignUp data={data} setData={setData} setStatus={setStatus} />;
      case "select-roles":
        return <Roles data={data} setData={setData} setStatus={setStatus} />;
      case "profile-image":
        return <ProfileImg data={data} setData={setData} />;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <HandleRoutes />
      </div>
    </div>
  );
}

export default AuthPage;
