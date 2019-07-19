import React from "react";
import Router from "next/router";
import RequestReset from "../components/RequestReset";

const RequestResetPage = () => {
  Router.push("/signin");
  return <RequestReset />;
};

export default RequestResetPage;
