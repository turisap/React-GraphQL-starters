import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import { Form } from "react-advanced-form";
import { CreateWithFilesUpload } from "../../abstractions/CreateWithFilesUpload";
// import DisplayError from "../../ErrorMessage";
// import Loading from "../../Loading";
import Input from "../../fields/Input";
import Select from "../../fields/Select";
import FileUpload from "../../fields/FileUpload";

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

const ALL_TAGS_OF_JOB_GROUP_QUERY = gql`
  query ALL_TAGS_QUERY($jobGroup: String!) {
    allTagsOfJobGroup(jobGroup: $jobGroup) {
      id
      title
      jobGroup
    }
  }
`;

/* eslint-disable */
const Composed = adopt({
  createJob: ({ render }) => <Mutation mutation={CREATE_JOB_MUTATION}>{render}</Mutation>,
});
/* eslint-enable */

class CreateJob extends CreateWithFilesUpload {
  //TODO add assignees from project participants
  // TODO add form validation using react-advanced-form
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  state = {
    jobGroup: null
  };

  render() {
    return (
      <Composed>
        {({ createJob }) => {
          return (
            <Form
              action={({ serialized }) => {
                // console.log(serialized);
                createJob({
                  variables: {
                    ...serialized,
                    title: serialized.createJob__title,
                    unit: serialized.unit__number
                  }
                });
                this.resetState();
              }}
              ref={this.formRef}
              className="createJob__form"
            >
              <Select
                required
                name="jobGroup"
                label="Job Group"
                onChange={e => this.setState({ jobGroup: e.nextValue })}
              >
                <option value="0">Select job group</option>
                <option value="SURVEY">SURVEY</option>
                <option value="FOUNDATION">FOUNDATION</option>
                <option value="STRUCTURAL_STEEL">STRUCTURAL STEEL</option>
                <option value="STRUCTURAL_CONCRETE">STRUCTURAL CONCRETE</option>
                <option value="FITIN">FITIN</option>
                <option value="PLUMBING">PLUMBING</option>
                <option value="ELECTRICAL">ELECTRICAL</option>
                <option value=" HANDOVER"> HANDOVER</option>
              </Select>
              <Input
                label="Title"
                required
                type="text"
                name="createJob__title"
              />
              <Input required label="level" type="number" name="level" />
              <Input
                label="Unit number"
                required
                type="text"
                name="unit__number"
              />
              {/*{this.state.jobGroup &&*/}
              {/*<Query query={ALL_TAGS_OF_JOB_GROUP_QUERY} variables={{jobGroup : this.state.jobGroup }}>*/}
              {/*{({ data, loading, error }) => {*/}
              {/*if (error) return <DisplayError error={error}/>;*/}
              {/*if(loading) return <Loading/>;*/}
              {/*if(data.allTagsOfJobGroup.length)*/}
              {/*return (*/}
              {/*<label>*/}
              {/*Tag*/}
              {/*<select*/}
              {/*required*/}
              {/*name="tag"*/}
              {/*value={this.state.tag}*/}
              {/*onChange={this.saveToState}*/}
              {/*>*/}
              {/*<option value="" disabled selected>*/}
              {/*Select a tag*/}
              {/*</option>*/}
              {/*{data.allTagsOfJobGroup.map(tag => (*/}
              {/*<option value={tag.id}>{tag.title}</option>*/}
              {/*))}*/}
              {/*</select>*/}
              {/*</label>*/}
              {/*)*/}
              {/*return ""*/}
              {/*}}*/}
              {/*</Query>*/}
              {/*}*/}
              <Select required name="assignee" label="Assignee">
                <option value="0">Select Assignee</option>
                <option value="1">BOB</option>
              </Select>
              <Select required name="createJob__tag" label="Tag">
                <option value="0">Select Tag</option>
                <Query
                  query={ALL_TAGS_OF_JOB_GROUP_QUERY}
                  variables={{ jobGroup: this.state.jobGroup }}
                >
                  {({ data }) => {
                    if (!data.allTagsOfJobGroup) return "";
                    return data.allTagsOfJobGroup.map(tag => (
                      <option value={tag.id} key={tag.id}>
                        {tag.title}
                      </option>
                    ));
                  }}
                </Query>
              </Select>
              <FileUpload
                label="Job Picture"
                name="job__picture"
                required
                formRef={this.formRef}
                changeHandle={this.uploadFile}
              />
              <button type="submit">Create</button>
            </Form>
          );
        }}
      </Composed>
    );
  }
}

export default CreateJob;
