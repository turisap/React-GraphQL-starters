import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";

const RESET_REQUEST_MUTATION = gql`
  mutation RESET_REQUEST_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: ""
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Mutation mutation={RESET_REQUEST_MUTATION} variables={this.state}>
        {(resetFunction, { error, loading, called }) => {
          return (
            <form
              data-test="reset-form"
              method="post"
              className="passwordReset__form"
              onSubmit={async e => {
                e.preventDefault();
                await resetFunction();
                this.setState({ email: "" });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <div className="passwordReset__container">
                  <h2>Request a password reset</h2>
                  <Error error={error} />
                  {!error && !loading && called && (
                    <p>
                      You reset request has been successful, check your email
                    </p>
                  )}
                  <label>
                    Email
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.saveToState}
                    />
                  </label>
                  <button type="submit">Request reset</button>
                </div>
              </fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

RequestReset.propTypes = {};

export default RequestReset;
export { RESET_REQUEST_MUTATION };
