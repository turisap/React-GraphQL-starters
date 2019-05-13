import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const VERIFIED_USER_QUERY = gql`
  query VERIFIED_USER_QUERY($verificationEmailToken: String!) {
    user(where: { verificationEmailToken: $verificationEmailToken }) {
      name
      email
      emailVerified
    }
  }
`;

// const VERIFY_EMAIL_MUTATION = gql`
//   mutation VERIFY_EMAIL_MUTAION ($id : ID!, $token : String!)
// `;

class VerifyEmail extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    verificationEmailToken: PropTypes.string.isRequired
  };

  render() {
    const { id, verificationEmailToken } = this.props;
    //console.log(this.props);
    return (
      <Query variables={{ verificationEmailToken, id }} query={VERIFIED_USER_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          if (!data.user) return <div>This user has not been found</div>;
          if (data.user.emailVerified)
            return <div>This email has already been verified</div>;

          return <Mutation />;
        }}
      </Query>
    );
  }
}

export default VerifyEmail;
