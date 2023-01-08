import React, { useState } from "react";
import { CaretLeftFill } from "react-bootstrap-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Error from "../error/Error";

function SignUp({ data, setData, setStatus }) {
  const [error, setError] = useState();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleForm = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { email, password } = form;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setData({ ...data, ...form, uid: user.uid });
        console.log("User created.");
        setStatus("select-roles");
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/email-already-in-use":
            setError("Email already in use.");
            break;
          case "auth/invalid-email":
            setError("Invalid Email");
            break;
          case "auth/operation-not-allowed":
            setError("Operation not allowed.");
            break;
          case "auth/weak-password":
            setError("Weak password.");
            break;
          default:
            break;
        }
      });
  };

  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {error ? <Error errorMsg={error} /> : null}
      <h1>Create Your Account</h1>

      {/* form group */}
      <div>
        <div class="form-group">
          <label for="Username">Username</label>
          <input
            style={{ width: "100%" }}
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter Username"
            onChange={(e) => handleForm(e)}
          />
        </div>
        <div class="form-group">
          <label for="Email">Email address</label>
          <input
            style={{ width: "100%" }}
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            onChange={(e) => handleForm(e)}
          />
        </div>
        <div class="form-group">
          <label for="Password">Password</label>
          <input
            style={{ width: "100%" }}
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => handleForm(e)}
          />
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={(e) => handleSignUp(e)}
      >
        Register
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <CaretLeftFill color="black" size={20} />
        <p
          style={{
            display: "flex",
            textDecoration: "underline",
            marginBottom: "0px",
            marginTop: "0px",
            fontWeight: "700",
            cursor: "pointer",
          }}
          onClick={() => {
            setStatus("login");
          }}
        >
          Login
        </p>
      </div>
    </form>
  );
}

export default SignUp;
