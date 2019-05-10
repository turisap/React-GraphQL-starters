import React, { useEffect } from "react";
import Router from "next/router";

const SignUpPageSucces = () => {
  useEffect(() => {
    setTimeout(() => {
      Router.push("/");
    }, 3000);
  });
  return (
    <div>
      <p>You have been successfully signed up</p>
    </div>
  );
};

export default SignUpPageSucces;
