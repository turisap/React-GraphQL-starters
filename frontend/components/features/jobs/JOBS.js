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

const JOB_GROUP_FILTER = gql`
    query JOB_GROUP_FILTER {
      jobGroupFilter @client
    }
`;

const JOB_GROUP_TAG = gql`
    query JOB_GROUP_TAG {
      jobTagFilter @client
    }
`;


const Composed = adopt({
  projectJobs: ({ render }) => (
    <Query query={CURRENT_PROJECTS_JOBS}>{render}</Query>
  ),
  currentProject: ({ render }) => (
    <Query query={CURRENT_PROJECT}>{render}</Query>
  ),
  localStateJobGroup : ({ render }) => (
      <Query query={JOB_GROUP_FILTER}>{render}</Query>
  ),
  localStateJobTag : ({ render }) => (
      <Query query={JOB_GROUP_TAG}>{render}</Query>
  )
});

//  TODO sorting by assignees/tags and so on

class JOBS extends Component {
  render() {
    return (
      <div className="jobsPage">
        <Composed>
          {({ projectJobs, currentProject, localStateJobGroup, localStateJobTag, error, loading }) => (
              <Query query={ALL_TAGS_OF_JOB_GROUP_QUERY} variables={{jobGroup : localStateJobGroup.data.jobGroupFilter}}>
                {(payload) => {
                  const { data : tagList }  = payload;
                  console.log(tagList)
                  if (error) return <DisplayError error={error} />;
                  if (loading) return <Loading />;
                  console.log(localStateJobGroup.data.jobGroupFilter)
                  console.log("LOCAL STATE TAG", localStateJobTag)
                  const jsx = [
                    <SortingFilter key={0} tags={tagList}/>,
                    <Link href="/createJob" key={1}>
                      <a>Create one</a>
                    </Link>
                  ];
                  if (!projectJobs.data.projectJobs.length) {
                    jsx.push(
                        <p key={2}>
                          You don&apos;t have any jobs for{" "}
                          {currentProject.data.project.title} yet.
                        </p>
                    );
                    return jsx;
                  }

                  jsx.push(
                      projectJobs.data.projectJobs.map(job => (
                          <Job job={job} key={job.id} />
                      ))
                  );
                  return jsx;
                }}
              </Query>
          )}
        </Composed>
      </div>
    );
  }
}

export default JOBS;
export { CURRENT_PROJECTS_JOBS };
