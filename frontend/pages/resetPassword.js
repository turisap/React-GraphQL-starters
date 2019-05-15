import React from "react";
import PropTypes from "prop-types";
import ResetPassword from "../components/ResetPassword";

const ResetPasswordPage = props => (
  <ResetPassword resetToken={props.query.token} />
);

ResetPasswordPage.propTypes = {
  query: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordPage;
