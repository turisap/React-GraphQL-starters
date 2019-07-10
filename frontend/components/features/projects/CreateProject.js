import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import { CreateWithFilesUpload } from "../../abstractions/CreateWithFilesUpload";
import Error from "../../ErrorMessage";
import Loading from "../../Loading";
import { USERS_PROJECTS_QUERY } from "./PROJECTS";

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
        refetchQueries={[{ query: USERS_PROJECTS_QUERY }]}
        onCompleted={() => {
          Router.push("/");
        }}
      >
        {(createProject, { error, loading }) => {
          if (loading) return <Loading />;
          return (
            <div className="createProject__container">
              <img
                src="../../../static/create__project.png"
                alt="create job image"
                className="createProject__image"
              />
              <h2 className="createProject__heading">Create a new project</h2>
              <p className="createProject__annotation">
                Please provide all your new project information to create a
                basic project
              </p>
              <form
                className="createProject__form"
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
                  <div className="createProject__formgrid">
                    <Error
                      error={error || { message: this.state.uploadError }}
                    />
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
                    <label className="customFile__upload">
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
                  </div>
                </fieldset>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateProject;
