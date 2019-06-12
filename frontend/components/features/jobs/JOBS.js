/* eslint-disable */
import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import { adopt } from "react-adopt";
import DisplayError from "../../ErrorMessage";
import Loading from "../../Loading";
import Job from './Job';

// const CURRENT_PROJECT_QUERY = gql`
//   {
//       projectId @client
//   }
// `;

const CURRENT_PROJECTS_JOBS = gql`
  query CURRENT_PROJECT_JOBS {
    projectJobs {
      id
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

const CURRENT_PROJECT = gql`
  query CURRENT_PROJECT {
    project {
      title
    }
  }
`;

const Composed = adopt({
  projectJobs: ({ render }) => (
    <Query query={CURRENT_PROJECTS_JOBS}>{render}</Query>
  ),
  currentProject: ({ render }) => (
    <Query query={CURRENT_PROJECT}>{render}</Query>
  )
});

class JOBS extends Component {
  render() {
    return (
      <Composed>
        {({ projectJobs, currentProject, data, error, loading }) => {
          if (error) return <DisplayError error={error} />;
          if (loading) return <Loading />;
          if (!projectJobs.data.projectJobs.length)
            return (
              <p>
                You don&apos;t have any jobs for{" "}
                {currentProject.data.project.title} yet.
                <Link href="/createJob">
                  <a>Create one</a>
                </Link>
              </p>
            );console.log(projectJobs.data.projectJobs)

          return projectJobs.data.projectJobs.map(job => <Job job={job} key={job.id}/>);
        }}
      </Composed>
    );
  }
}

export default JOBS;
