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

const LOCAL_STATE_REMOVE_FILTERS = gql`
  mutation LOCAL_STATE_REMOVE_FILTERS($name : String!) {
    removeFilters(name : $name) @client
  }
`;

const Composed = adopt({
  setLocalStateGroupFilter: ({ render }) => (
    <Mutation mutation={LOCAl_STATE_SET_GROUP_FILTER}>{render}</Mutation>
  ),
  setLocalStateTagFilter: ({ render }) => (
    <Mutation mutation={LOCAL_STATE_SET_TAG_FILTER}>{render}</Mutation>
  ),
  removeFiltersFromLocalState: ({ render }) => (
    <Mutation mutation={LOCAL_STATE_REMOVE_FILTERS}>{render}</Mutation>
  )
});

function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(!value); // toggle the state to force render
}

const SortingFilter = props => {
  const [groupFilter, setGroupFilter] = useState(null);
  const { tags } = props;
  const forceUpdate = useForceUpdate();

  return (
    <Composed>
      {({ setLocalStateGroupFilter, setLocalStateTagFilter, removeFiltersFromLocalState }) => {
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
          return (
            <>
              {tags.map(tag => (
                <p
                  key={tag.id}
                  onClick={() =>
                    setLocalStateTagFilter({ variables: { tagFilter: tag.id } })
                  }
                >
                  {tag.title}
                </p>
              ))}
              <button
                onClick={() => {
                  forceUpdate();
                  removeFiltersFromLocalState();
                }}
              >
                BACK
              </button>
            </>
          );
        }
        return "";
      }}
    </Composed>
  );
};

export default SortingFilter;
