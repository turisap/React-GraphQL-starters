import React, { useState } from "react";
import { CONFIG } from "../../../config";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import Loading from "../../Loading";

const LOCAl_STATE_SET_GROUP_FILTER = gql`
  mutation LOCAL_STATE_SET_GROUP_FILTER($jobGroup: String) {
    setJobGroupFilter(jobGroupFilter: $jobGroup) @client
  }
`;

const LOCAL_STATE_SET_TAG_FILTER = gql`
  mutation LOCAL_STATE_SET_TAG_FILTER($tagFilter: String) {
    setJobTagFilter(jobTagFilter: $tagFilter) @client
  }
`;

const Composed = adopt({
  setLocalStateGroupFilter: ({ render }) => (
    <Mutation mutation={LOCAl_STATE_SET_GROUP_FILTER}>{render}</Mutation>
  ),
  setLocalStateTagFilter : ({ render }) => (
      <Mutation mutation={LOCAL_STATE_SET_TAG_FILTER}>{render}</Mutation>
  )
});

const SortingFilter = props => {
  const [groupFilter, setGroupFilter] = useState(null);
  const { tags } = props;

  return (
    <Composed>
      {({ setLocalStateGroupFilter, setLocalStateTagFilter }) => {
        if (!groupFilter && !tags.length) {
          return CONFIG.JOB_GROUPS.map(jobGroup => (
            <p
              key={jobGroup}
              onClick={() => {
                setGroupFilter(jobGroup);
                setLocalStateGroupFilter({ variables: { jobGroup } });
              }}
            >
              {jobGroup}
            </p>
          ));
        }
        if (tags) {
          return tags.map(tag => <p key={tag.id} onClick={() => setLocalStateTagFilter({variables: {tagFilter: tag.id}})}>{tag.title}</p>);
        }
        return "";
      }}
    </Composed>
  );
};

export default SortingFilter;
