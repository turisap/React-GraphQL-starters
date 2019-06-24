/* eslint-disable */
import React, {Component, useState} from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import { adopt } from "react-adopt";
import DisplayError from "../../ErrorMessage";
import Loading from "../../Loading";
import Job from "./Job";
import SortingFilter from "./SortingFilter";
import { ALL_TAGS_OF_JOB_GROUP_QUERY } from "./CreateJob";

const CURRENT_PROJECTS_JOBS = gql`
  query CURRENT_PROJECT_JOBS($jobGroupFilter: String, $jobTagFilter : ID) {
    projectJobs(jobGroup: $jobGroupFilter, jobTag : $jobTagFilter) {
      id
      title
      level
      unit
      tag {
        id
        jobGroup
        title
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


const LOCAL_STATE_JOB_TAG_QUERY = gql`
  query {
    jobTagFilter @client
  }
`;

const LOCAL_STATE_JOB_GROUP_QUERY = gql`
    query {
      jobGroupFilter @client
    }
`;

const SET_TAGS_FOR_JOB_GROUP = gql`
    mutation SET_TAGS_FOR_JOB_GROUP ($jobGroupTags : Array) {
      setJobGroupTags (jobGroupTags: $jobGroupTags) @client
    }
`;

const Composed = adopt({
  currentProject: ({ render }) => (
    <Query query={CURRENT_PROJECT}>{render}</Query>
  ),
  localStateJobGroup: ({ render }) => (
    <Query query={LOCAL_STATE_JOB_GROUP_QUERY} >{render}</Query>
  ),
  localStateJobTag : ({ render} ) => (
      <Query query={LOCAL_STATE_JOB_TAG_QUERY} >{render}</Query>
  ),
  setTagsForJobGroupToLocalState : ({ render }) => (
      <Mutation mutation={SET_TAGS_FOR_JOB_GROUP}>{render}</Mutation>
  )
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
          {({ currentProject, localStateJobGroup, localStateJobTag, setTagsForJobGroupToLocalState }) => {
            const jobGroupFilter = localStateJobGroup.data.jobGroupFilter;
            const jobTagFilter = localStateJobTag.data.jobTagFilter;
            console.log('job group filter to query', jobGroupFilter)
            return (
                <Query query={ALL_TAGS_OF_JOB_GROUP_QUERY} variables={{jobGroup: jobGroupFilter}}>
                  {({data,loading,error}) => {
                    let jobGroupTags = data ? data.allTagsOfJobGroup: [];
                    jobGroupTags = jobGroupFilter ? jobGroupTags : [];
                     console.log("TAGS for a job group", jobGroupTags);
                     console.log("jobGroup filter", jobGroupFilter);
                     console.log("LOCAL STATE JOB TAG", jobTagFilter);

                    const jsx = [
                      <SortingFilter key={0} tags={jobGroupTags} update={this.forceUpdate.bind(this)}/>,
                      <Link href="/createJob" key={1} tags={jobGroupTags}>
                        <a>Create one</a>
                      </Link>
                    ];
                    return (
                        <Query query={CURRENT_PROJECTS_JOBS} variables={{
                          jobGroupFilter,
                          jobTagFilter
                        }}>
                          {({ data, loading }) => {
                            const projectJobs = data ? data.projectJobs : [];
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
                    );
                  }}
                </Query>
            )
          }}
        </Composed>
      </div>
    );
  }
}

export default JOBS;
export { CURRENT_PROJECTS_JOBS, LOCAL_STATE_JOB_GROUP_QUERY, LOCAL_STATE_JOB_TAG_QUERY };
