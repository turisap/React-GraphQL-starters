import React, { useState } from "react";
import faker from "faker";
import { Query, Mutation } from "react-apollo";
import {
  ALL_TAGS_OF_JOB_GROUP_QUERY,
  CREATE_JOB_MUTATION,
  ALL_PROJECT_PARTICIPANTS_QUERY
} from "../components/features/jobs/CreateJob";


function useForceUpdate(){
  const [value, set] = useState(true); //boolean state
  return () => set(!value); // toggle the state to force render
}

const CreateFakeJobs = () => {
  const jobGroup = _getRandomElement(jobGroups);

  let fakeJob = _getFakeJob(_getRandomLevel());

  const forceUpdate = useForceUpdate();

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
                    <button
                      onClick={() => {
                        createJob();
                        forceUpdate();
                      }}
                    >
                      Create A Job
                    </button>
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

const _getFakeJob = level => ({
  title: faker.lorem.word(),
  level,
  unit: _getRandomUnit(level),
  image: "https://placeholder.com/",
  largeImage: "https://placeholder.com/",
  // assignee: User
  description: faker.lorem.paragraph()
});
const _getRandomLevel = () => Math.ceil(Math.random() * 10 + 1);
const _getRandomUnit = level =>
  `${level}${_getRandomLevel()}${_getRandomLevel()}`;
const _getRandomElement = entity =>
  entity[Math.floor(Math.random() * entity.length)];
export default CreateFakeJobs;
