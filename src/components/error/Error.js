import React from "react";

function Error({ errorMsg }) {
  return (
    <div class="alert alert-danger" role="alert">
      {errorMsg}
    </div>
  );
}

export default Error;
