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
            <p>We need to recognize you first..</p>
            <SignIn />
            <p>
              Or sign up if you are new to us
              <Link href={"/signup"}>
                <a>SIGNUP</a>
              </Link>
            </p>
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

Authentication.propTypes = {
  children: PropTypes.object.isRequired
};

export { Authentication };
