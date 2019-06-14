import React, { useState } from "react";
import { CONFIG } from "../../../config";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { adopt } from "react-adopt";
import Loading from "../../Loading";

const SET_JOBGROUP_FILTER_MUTATION = gql`
  mutation SET_JOBGROUP_FILTER_MUTATION($group: String!) {
    setJobGroupFilter(jobGroupFilter: $group) @client
  }
`;

const SET_JOBTAG_FILTER_MUTATION = gql`
  mutation SET_JOBTAG_FILTER_MUTATION($tag: ID!) {
    setJobTagFilter(jobTagFilter: $tag) @client
  }
`;

const Composed = adopt({
  setJobGroupFilter: ({ render }) => (
    <Mutation mutation={SET_JOBGROUP_FILTER_MUTATION}>{render}</Mutation>
  ),
  setJobTagFilter: ({ render }) => (
    <Mutation mutation={SET_JOBTAG_FILTER_MUTATION}>{render}</Mutation>
  )
});

const SortingFilter = props => {
  const { tags } = props;
  const [mode, setMode] = useState("group");
  const [group, setGroup] = useState(false);
  const [tag, setTag] = useState(null);
  return (
    <Composed>
      {({ setJobGroupFilter, setJobTagFilter, loading }) => {
        if (loading) return <Loading />;
        if (mode === "group")
          return CONFIG.JOB_GROUPS.map(group => (
            <p
              onClick={() => {
                setMode("tag");
                setGroup(group);
                setJobGroupFilter({ variables: { group } });
              }}
              key={group}
            >
              {group}
            </p>
          ));
        if (mode === "tag" && tags && tags.allTagsOfJobGroup.length)
          return tags.allTagsOfJobGroup.map(tag => (
            <p
              key={tag.id}
              onClick={() => {
                setJobTagFilter({ variables: { tag: tag.id } });
                setTag(tag.id);
              }}
            >
              {tag.title}
            </p>
          ));
        return "";
      }}
    </Composed>
  );
};

export default SortingFilter;
