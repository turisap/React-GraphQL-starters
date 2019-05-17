import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Router from "next/router";
import validatePassword from "../lib/validatePassword";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };

  state = {
    password: "",
    confirmPassword: "",
    validPassword: false,
    touchedPassword: false,
    resetSuccessful: false
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validatePassword = e => {
    const validPassword = validatePassword(e.target.value);
    this.setState({
      validPassword,
      touchedPassword: true
    });
  };

  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={() => {
          this.setState({ resetSuccessful: true });
          setTimeout(() => Router.push("/signin"), 3000);
        }}
      >
        {(reset, { error, loading }) =>
          this.state.resetSuccessful ? (
            <p>Your password has been successfully reset, please signin</p>
          ) : (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                this.setState({
                  password: "",
                  confirmPassword: ""
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>
                <Error error={error} />
                {this.state.touchedPassword && !this.state.validPassword && (
                  <Error
                    error={{
                      message:
                        "Password should contain at least one letter, digit, uppercase, lowercase and to be at least 8 characters long"
                    }}
                  />
                )}
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                    onBlur={this.validatePassword}
                  />
                </label>

                <label htmlFor="confirmPassword">
                  Confirm Your Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                    onBlur={this.validatePassword}
                  />
                </label>

                <button type="submit">Reset Your Password!</button>
              </fieldset>
            </form>
          )
        }
      </Mutation>
    );
  }
}

export default Reset;
