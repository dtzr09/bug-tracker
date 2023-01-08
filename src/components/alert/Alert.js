import React from "react";

function Alert(props) {
  const { name, status, errorMsg } = props;
  return (
    <div>
      <div
        class={`alert alert-${status == "success" ? "success" : "danger"}`}
        role="alert"
      >
        {status == "success" ? <div>{name} added!</div> : <div>{errorMsg}</div>}
      </div>
    </div>
  );
}

export default Alert;
