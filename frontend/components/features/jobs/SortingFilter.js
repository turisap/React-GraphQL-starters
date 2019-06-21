import React, { useState } from "react";
import { CONFIG } from "../../../config";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
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
  mutation LOCAL_STATE_REMOVE_FILTERS($name: String!) {
    removeFilters(name: $name) @client
  }
`;

const LOCAL_STATE_GET_JOB_GROUP_TAGS = gql`
  query {
    allTagsOfJobGroup @client
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
  ),
  allJobGroupTags: ({render}) => (
      <Query query={LOCAL_STATE_GET_JOB_GROUP_TAGS}>{render}</Query>
  )
});

function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(!value); // toggle the state to force render
}

const SortingFilter = props => {
  //const [groupFilter, setGroupFilter] = useState(null);
  const forceUpdate = useForceUpdate();
  const tags = props.tags || []

  return (
      <Composed>
        {({setLocalStateGroupFilter, removeFiltersFromLocalState}) => {
          console.log("+++++++++",tags)
          if (!tags.length)
            return CONFIG.JOB_GROUPS.map(group => <p key={group} onClick={() => {
              setLocalStateGroupFilter({variables: {jobGroup : group}})
            }}>{group}</p>);

          if(tags.length)
            return (
                <>
                  {tags.map(tag => <p key={tag.id}>{tag.title}</p>)}
                  <button onClick={removeFiltersFromLocalState}>back</button>
                </>
            )
        }}
      </Composed>
  );
};

export default SortingFilter;
