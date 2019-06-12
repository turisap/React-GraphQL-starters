import React from "react";
import CreateFakeUsers from "../factories/userFactory";
import CreateFakeJobs from "../factories/jobsFactory";

const FakaDataPage = () => (
  <>
    <CreateFakeUsers />
    <CreateFakeJobs />
  </>
);

export default FakaDataPage;
