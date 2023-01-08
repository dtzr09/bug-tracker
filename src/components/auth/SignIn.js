import React, { useState } from "react";
import { CaretRightFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Error from "../error/Error";

function SignIn({ setStatus }) {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate(`${user.uid}/dashboard`);
        })
        .catch((error) => {
          const errorCode = error.code;

          switch (errorCode) {
            case "auth/invalid-email":
              setError("Invalid Email");
              break;
            case "auth/user-disabled":
              setError("Your account is disabled");
              break;
            case "auth/user-not-found":
              setError("User not found. Please create an account");
              break;
            case "auth/wrong-password":
              setError("Wrong Password");
              break;
          }
        });
    }
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
      <h1>Login</h1>
      <div>
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
        onClick={(e) => handleSignIn(e)}
      >
        Sign In
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
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
            setStatus("signUp");
          }}
        >
          Create account
        </p>
        <CaretRightFill color="black" size={20} />
      </div>
    </form>
  );
}

export default SignIn;
