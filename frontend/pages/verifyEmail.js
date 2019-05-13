import React from "react";
import VerifyEmail from "../components/VerifyEmail";
/* eslint-disable react/prop-types */

const VerifyEmailPage = props => (
  <VerifyEmail id={props.query.id} verificationEmailToken={props.query.token} />
);

/* eslint-enable react/prop-types */

export default VerifyEmailPage;
