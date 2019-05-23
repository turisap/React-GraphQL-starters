import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import { CreateWithFilesUpload } from "../../abstractions/CreateWithFilesUpload";

const CREATE_JOB_MUTATION = gql`
  mutation CREATE_JOB_MUATION(
    $tag: ID!
    $title: String!
    $level: Float!
    $unit: String!
    $image: String
    $largeImage: String
    $assignee: ID!
  ) {
    createJob(
      tag: $tag
      title: $title
      level: $level
      unit: $unit
      image: $image
      largeImage: $largeImage
      assignee: $assignee
    ) {
      id
      title
    }
  }
`;

/* eslint-disable */
const Composed = adopt({
  createJob: ({ render }) => <Mutation mutation={CREATE_JOB_MUTATION}>{render}</Mutation>,
});
/* eslint-enable */

class CreateJob extends CreateWithFilesUpload {
  state = {
    tag: null,
    title: "",
    level: "",
    unit: "",
    image: "",
    largeImage: "",
    assignee: ""
  };

  //TODO add tags fetched from db
  //TODO add assignees from project participants

  render() {
    return (
      <Composed>
        {({ createJob }) => {
          return (
            <form
              className="createJob__form"
              onSubmit={e => {
                e.preventDefault();
                this.resetState();
                createJob({ variables: this.state });
              }}
            >
              <fieldset className="createJob__fieldset">
                <label>
                  Title
                  <input
                    required
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Level
                  <input
                    required
                    type="number"
                    name="level"
                    value={this.state.level}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Unit
                  <input
                    required
                    type="text"
                    name="unit"
                    value={this.state.unit}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Tag
                  <select
                    required
                    name="tag"
                    value={this.state.tag}
                    onChange={this.saveToState}
                  >
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="plasterboard">Plasterboard</option>
                    <option value="steel_studs">Steel Studs</option>
                  </select>
                </label>
                <label>
                  Assignee
                  <input
                    type="text"
                    name="assignee"
                    value={this.state.assignee}
                    onChange={this.saveToState}
                  />
                </label>
                <label>
                  Picture
                  <input type="file" onChange={this.uploadFile} />
                </label>
              </fieldset>
              <button type="submit">Create</button>
            </form>
          );
        }}
      </Composed>
    );
  }
}

export default CreateJob;
