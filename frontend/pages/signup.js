import React from "react";
import SignUp from "../components/SignUp";
import Router from "next/router";

const SignUpPage = () => {
  Router.push("/signin");
  return <SignUp />;
};

export default SignUpPage;
