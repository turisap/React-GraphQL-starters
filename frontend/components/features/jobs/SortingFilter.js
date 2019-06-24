import React, { useState } from "react";
import { CONFIG } from "../../../config";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { adopt } from "react-adopt";
import Loading from "../../Loading";
import { LOCAL_STATE_JOB_GROUP_QUERY, LOCAL_STATE_JOB_TAG_QUERY } from "./JOBS";

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



const Composed = adopt({
  setLocalStateGroupFilter: ({ render }) => (
    <Mutation mutation={LOCAl_STATE_SET_GROUP_FILTER}>{render}</Mutation>
  ),
  setLocalStateTagFilter: ({ render }) => (
    <Mutation mutation={LOCAL_STATE_SET_TAG_FILTER}>{render}</Mutation>
  ),
  removeFiltersFromLocalState: ({ render }) => (
    <Mutation
      mutation={LOCAL_STATE_REMOVE_FILTERS}
    >
      {render}
    </Mutation>
  ),
});

const SortingFilter = props => {
  const tags = props.tags || [];
  const [tagId, setTagId] = useState(false);

  return (
    <Composed>
      {({
        setLocalStateGroupFilter,
        setLocalStateTagFilter,
        removeFiltersFromLocalState
      }) => {
        //console.log("+++++++++", tags);
        if (!tags.length)
          return CONFIG.JOB_GROUPS.map(group => (
            <p
              key={group}
              onClick={() => {
                setLocalStateGroupFilter({ variables: { jobGroup: group } });
              }}
            >
              {group}
            </p>
          ));
        const button = (
          <button
            onClick={() => {
              removeFiltersFromLocalState();
              props.update();
            }}
          >
            back
          </button>
        );

        if (tags.length && !tagId)
          return (
            <>
              {tags.map(tag => (
                <p
                  key={tag.id}
                  onClick={() => {
                    setTagId(tag.id);
                    setLocalStateTagFilter({
                      variables: { tagFilter: tag.id }
                    });
                  }}
                >
                  {tag.title}
                </p>
              ))}
              {button}
            </>
          );

        if (tagId)
          return (
            <>
              {tags.map(tag => (
                <p key={tag.id} active={!!tagId}>
                  {tag.title}
                </p>
              ))}
              {button}
            </>
          );
      }}
    </Composed>
  );
};

export default SortingFilter;
