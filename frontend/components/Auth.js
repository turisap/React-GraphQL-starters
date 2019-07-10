import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Link from "next/link";
import { CURRENT_USER_QUERY } from "./User";
import SignIn from "./SignIn";

const Authentication = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div className="auth">
            <h2 className="signInForm__heading">We need to recognize you first..</h2>
            <SignIn />
            <p>
              <span>Or sign up if you are new to us</span>
              <Link href={"/signup"}>
                <a className="signup__button">SIGNUP</a>
              </Link>
            </p>
          </div>
        );
      }
      if (!data.me.emailVerified) return <p>Please verify your email</p>;

      return props.children;
    }}
  </Query>
);

Authentication.propTypes = {
  children: PropTypes.array.isRequired
};

export { Authentication };
