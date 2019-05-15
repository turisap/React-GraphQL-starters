import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
//import { adopt } from 'react-adopt';
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const VERIFIED_USER_QUERY = gql`
  query VERIFIED_USER_QUERY($id: ID!) {
    user(where: { id: $id }) {
      name
      email
      emailVerified
      verificationEmailToken
    }
  }
`;

const VERIFY_EMAIL_MUTATION = gql`
  mutation VERIFY_EMAIL_MUTAION($id: ID!) {
    verifyEmail(id: $id) {
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

  state = {
    userVerified: false
  };

  render() {
    const { id, verificationEmailToken } = this.props;
    return (
      <Query
        variables={{ verificationEmailToken, id }}
        query={VERIFIED_USER_QUERY}
      >
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          if (!data) return <div>This user has not been found</div>;
          if (data.user.emailVerified || !data.user.verificationEmailToken)
            return <div>This email has already been verified</div>;

          return (
            <Mutation
              mutation={VERIFY_EMAIL_MUTATION}
              variables={{ id }}
              onCompleted={() => this.setState({ userVerified: true })}
            >
              {(verifyEmail, { loading, error }) => {
                if (error) return <ErrorMessage error={error} />;
                return (
                  <>
                    {this.state.userVerified ? (
                      <p>You successfully verified your email</p>
                    ) : (
                      <button onClick={verifyEmail}>
                        Confirm{loading ? "ation.." : ` ${data.user.email}`}
                      </button>
                    )}
                  </>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default VerifyEmail;
