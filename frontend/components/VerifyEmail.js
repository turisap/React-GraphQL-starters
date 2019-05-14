import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
//import { adopt } from 'react-adopt';
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const VERIFIED_USER_QUERY = gql`
  query VERIFIED_USER_QUERY($verificationEmailToken: String!) {
    user(where: { verificationEmailToken: $verificationEmailToken }) {
      name
      email
      emailVerified
      verificationEmailToken
    }
  }
`;

const VERIFY_EMAIL_MUTATION = gql`
  mutation VERIFY_EMAIL_MUTAION ($id : ID!) {
      verifyEmail( id : $id ) {
          name
          email
          emailVerified
          verificationEmailToken
      }
  }
`;

class VerifyEmail extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    verificationEmailToken: PropTypes.string.isRequired
  };

  render() {
    const { id, verificationEmailToken } = this.props;
    return (
      <Query
        variables={{ verificationEmailToken, id }}
        query={VERIFIED_USER_QUERY}
      >
        {({ data, loading, error }) => {
          console.log(data.user);
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          if (!data) return <div>This user has not been found</div>;
          if (data.user.emailVerified || !data.user.verificationEmailToken) return <div>This email has already been verified</div>;

          return (
            <Mutation
              mutation={VERIFY_EMAIL_MUTATION}
              variables={{ id }}
            >
              {(verifyEmail, { data, loading, error }) => {
                verifyEmail();
                if (loading) return <Loading />;
                if (error) return <ErrorMessage error={error}/>;
                if(!data) return <ErrorMessage error={{ message : "Verification failed, try later"}}/>;

                console.log(data);
                return <p>lol</p>
                // return <p>Your email { data.verifyEmail.email } has been verified, you can proceed to your account</p>
              }}
            </Mutation>
          )
        }}
      </Query>
    );
  }
}


export default VerifyEmail;
