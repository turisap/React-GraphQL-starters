import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { CURRENT_USER_QUERY } from "./User";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const SignOut = () => (
  // TODO make apollo clinet to clear cache on log out as here https://www.apollographql.com/docs/react/recipes/authentication
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    onCompleted={() => {
      cookies.remove("userId", { path: "/" });
      cookies.remove("projectId", { path: "/" });
      cookies.remove("tokenId", { path: "/" });
      cookies.remove("user", { path: "/" });
      cookies.remove("token", { path: "/" });
    }}
  >
      {signOut => <p className="signout__button" onClick={signOut} ><span>Sign Out</span><FontAwesomeIcon icon={faSignOutAlt}size="2x"/></p>}
  </Mutation>
);

export default SignOut;
