import React, { useState } from "react";
import faker from "faker";
import { Query, Mutation } from "react-apollo";
import {
  ALL_TAGS_OF_JOB_GROUP_QUERY,
  CREATE_JOB_MUTATION,
  ALL_PROJECT_PARTICIPANTS_QUERY
} from "../components/features/jobs/CreateJob";

const CreateFakeJobs = () => {
  const level = _getRandomLevel();
  const jobGroup = "FITIN"; //_getRandomElement(jobGroups);

  const fakeJob = {
    title: faker.lorem.word(),
    level,
    unit: _getRandomUnit(level),
    image: "https://placeholder.com/",
    largeImage: "https://placeholder.com/",
    // assignee: User
    description: faker.lorem.paragraph()
  };

  return (
    <Query query={ALL_TAGS_OF_JOB_GROUP_QUERY} variables={{ jobGroup }}>
      {({ data }) => {
        fakeJob.tag = _getRandomElement(data.allTagsOfJobGroup).id;
        return (
          <Query query={ALL_PROJECT_PARTICIPANTS_QUERY}>
            {({ data }) => {
              fakeJob.assignee = _getRandomElement(data.projectParticipants).id;
              return (
                <Mutation mutation={CREATE_JOB_MUTATION} variables={fakeJob}>
                  {createJob => (
                    <button onClick={createJob}>Create A Job</button>
                  )}
                </Mutation>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

const jobGroups = [
  "SURVEY",
  "FOUNDATION",
  "STRUCTURAL_STEEL",
  "FITIN",
  "PLUMBING",
  "ELECTRICAL",
  "HANDOVER"
];

const _getRandomLevel = () => Math.ceil(Math.random() * 10 + 1);
const _getRandomUnit = level =>
  `${level}${_getRandomLevel()}${_getRandomLevel()}`;
const _getRandomElement = entity =>
  entity[Math.floor(Math.random() * entity.length)];
export default CreateFakeJobs;
