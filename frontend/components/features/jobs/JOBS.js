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

//  TODO sorting by assignees/tags and so on

class JOBS extends Component {
  render() {
    return (
      <Composed>
        {({ projectJobs, currentProject, data, error, loading }) => {
          if (error) return <DisplayError error={error} />;
          if (loading) return <Loading />;
          const jsx = [
              <Link href="/createJob">
                <a>Create one</a>
              </Link>
          ];
          if (!projectJobs.data.projectJobs.length){
            jsx.push(<p>
              You don&apos;t have any jobs for{" "}
              {currentProject.data.project.title} yet.
            </p>)
            return jsx;
          }


          jsx.push(projectJobs.data.projectJobs.map(job => <Job job={job} key={job.id}/>));
          return jsx;
        }}
      </Composed>
    );
  }
}

export default JOBS;
export { CURRENT_PROJECTS_JOBS };
