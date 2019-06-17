/* eslint-disable */
import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import { adopt } from "react-adopt";
import DisplayError from "../../ErrorMessage";
import Loading from "../../Loading";
import Job from "./Job";
import SortingFilter from "./SortingFilter";
import { ALL_TAGS_OF_JOB_GROUP_QUERY } from "./CreateJob";

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
  currentProject: ({ render }) => (
    <Query query={CURRENT_PROJECT}>{render}</Query>
  ),
});

//  TODO sorting by assignees/tags and so on
/**
 * Modified projectJobs on the backend to accept tag and job group ( only to consoleloging). I need to pass it from frontend
 * now and wirte queries on the backend
 */

class JOBS extends Component {
  render() {
    return (
      <div className="jobsPage">
        <Composed>
          {({
            currentProject,
          }) => {
            const jsx = [
              <SortingFilter key={0} />,
              <Link href="/createJob" key={1}>
                <a>Create one</a>
              </Link>
            ];
            return (
                <Query
                    query={CURRENT_PROJECTS_JOBS}
                >
                  {({ data, loading }) => {
                    const { projectJobs } = data;
                    if (!projectJobs) {
                      jsx.push(
                          <p key={2}>
                            You don&apos;t have any jobs for{" "}
                            {currentProject.data.project.title} yet.
                          </p>
                      );
                      return jsx;
                    }
                    if (loading) return <Loading />;
                    jsx.push(
                        projectJobs.map(job => <Job job={job} key={job.id} />)
                    );
                    return jsx;
                  }}
                </Query>
            )
          }

          }
        </Composed>
      </div>
    );
  }
}


export default JOBS;
export { CURRENT_PROJECTS_JOBS };
