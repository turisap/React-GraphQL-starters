import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { CreateWithFilesUpload } from "../../abstractions/CreateWithFilesUpload";
import Error from "../../ErrorMessage";
import Loading from "../../Loading";

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUATION(
    $title: String!
    $address: String!
    $levels_number: Float!
    $image: String!
    $largeImage: String!
  ) {
    createProject(
      title: $title
      address: $address
      levels_number: $levels_number
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateProject extends CreateWithFilesUpload {
  state = {
    title: "",
    address: "",
    levels_number: "",
    image: "",
    largeImage: "",
    uploadError: ""
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_PROJECT_MUTATION}
        variables={this.state}
        onCompleted={() => {
          Router.push("/");
        }}
      >
        {(createProject, { error, loading }) => {
          if (loading) return <Loading />;
          return (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await createProject();
              }}
            >
              <fieldset
                disabled={loading}
                aria-busy={loading}
                className="createProject__fieldset"
              >
                <h2>Create Project</h2>
                <Error error={error || { message: this.state.uploadError }} />
                <label>
                  Title
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Address
                  <input
                    required
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={this.state.address}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Number of levels
                  <input
                    required
                    type="number"
                    name="levels_number"
                    value={this.state.levels_number}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Project Logo
                  <input
                    required
                    type="file"
                    name="avatar"
                    value={this.state.avatar}
                    onChange={this.uploadFile}
                  />
                </label>
                <button type="submit" disabled={loading}>
                  Create
                </button>
              </fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateProject;