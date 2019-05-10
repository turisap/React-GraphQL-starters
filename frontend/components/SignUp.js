import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from 'next/router';
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import { CONFIG } from "../config";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $organisation: String!
    $phone: String!
    $image: String!
    $largeImage: String!
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      organisation: $organisation
      phone: $phone
      image: $image
      largeImage: $largeImage
    ) {
      id
      email
      name
    }
  }
`;

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    organisation: "",
    phone: "",
    image: "",
    largeImage: "",
    uploadError: ""
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  uploadFile = async e => {
    if (!e.target.files) return;
    const files = e.target.files;
    if (files[0].type !== "image/jpeg") {
      this.setState({ uploadError: "Please upload an image file" });
      return;
    } else {
      this.setState({ uploadError: "" });
    }

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", CONFIG.CLOUDINARY_PRESET);

    const res = await fetch(CONFIG.CLOUDINARY_ENDPOINT, {
      method: "POST",
      body: data
    });

    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={() => Router.push('/signupSuccess')}
      >
        {(signUpFunction, { error, loading }) => {
          return (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signUpFunction();
                this.setState({ name: "", email: "", password: "" });
              }}
            >
              <fieldset
                disabled={loading}
                aria-busy={loading}
                className="signup__fieldset"
              >
                <h2>Sign up for an account</h2>
                <Error error={error || { message: this.state.uploadError }} />
                <label>
                  Name
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Password
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Organisation
                  <input
                    required
                    type="text"
                    name="organisation"
                    placeholder="Organisation"
                    value={this.state.organisation}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Phone Number
                  <input
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={this.state.phone}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Avatar Picture
                  <input
                    required
                    type="file"
                    name="avatar"
                    value={this.state.avatar}
                    onChange={this.uploadFile}
                  />
                </label>
                <button type="submit" disabled={!!this.state.uploadError}>
                  Sign Up
                </button>
              </fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

SignUp.propTypes = {};

export default SignUp;
export { SIGNUP_MUTATION };
