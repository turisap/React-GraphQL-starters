import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Cookies from "universal-cookie";
import Link from "next/link";
import DisplayError from "../../ErrorMessage";
import Loading from "../../Loading";

// const CURRENT_PROJECT_QUERY = gql`
//   {
//       projectId @client
//   }
// `;

const CURRENT_PROJECTS_JOBS = gql`
  query CURRENT_PROJECT_JOBS($projectId: ID!) {
    projectJobs(where: { id: $projectId }) {
      title
      level
      unit
      tag {
        title
        jobGroup
      }
    }
  }
`;

class JOBS extends Component {
  render() {
    const cookies = new Cookies();
    const projectId = cookies.get("projectId");
    return (
      <Query query={CURRENT_PROJECTS_JOBS} variables={{ projectId }}>
        {({ data, error, loading }) => {
          if (error) return <DisplayError error={error} />;
          if (loading) return <Loading />;
          if (!data.projectJobs.length)
            return (
              <p>
                You don&apos;t have any jobs for this project yet.
                <Link href="/createJob">
                  <a>Create one</a>
                </Link>
              </p>
            );
          return <p>lolol</p>;
        }}
      </Query>
    );
  }
}

export default JOBS;
