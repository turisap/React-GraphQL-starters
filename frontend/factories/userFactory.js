import React, { useState } from "react";
import faker from "faker";
import { Query, Mutation } from "react-apollo";
import gql from 'graphql-tag';
import { adopt } from "react-adopt";
import { EXISTING_OCCUPATIONS } from "../components/SignUp";

const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY {
      projects {
          title
          id
      }
  }
`;

const FAKE_SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $organisation: String!
    $occupation: String!
    $phone: String!
    $image: String!
    $largeImage: String!
    ) {
        fakeSignup(
            email: $email
            name: $name
            password: $password
            organisation: $organisation
            occupation: $occupation
            phone: $phone
            image: $image
            largeImage: $largeImage
        ) {
            id
            email
            name
            verificationEmailToken
        }
    }
`;

const Composed = adopt({
  signUp: ({ render }) => (
    <Mutation mutation={FAKE_SIGNUP_MUTATION}>{render}</Mutation>
  ),
  occupations: ({ render }) => (
    <Query query={EXISTING_OCCUPATIONS}>{render}</Query>
  ),
  projects : ({ render }) => (
    <Query query={ALL_PROJECTS_QUERY}>{render}</Query>
  )
});

const CreateFakeUsers = () => {
  const [usersNumber, setUsersNumber] = useState(0);

  const fakeUser = (occupations, projects) => (
    {
      name : `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password : faker.internet.password(),
      occupation : _getRandom(occupations).id,
      image: "https://i.pravatar.cc/300",
      largeImage : "https://i.pravatar.cc/800",
      organisation : "TROLOLO",
      phone: faker.phone.phoneNumber(),
      emailVerified: true,
      projects : _getRandom(projects).id
    }
  );

  return (
    <Composed>
      {({ signUp, occupations, projects }) => (
        <>
          <input
            type="number"
            required
            onChange={e => setUsersNumber(e.target.value)}
          />
          <button
            onClick={e => {
              e.preventDefault();
              const iterate =  [... Array(5)].fill(1);
              iterate.forEach(() => {
                setTimeout(async () => {
                  await signUp({ variables: {
                      ...fakeUser(occupations.data.occupations, projects.data.projects)
                    } })
                }, 500)
              })
            }}
          >
            CREATE {usersNumber} user{usersNumber === 1 ? "" : "s"}
          </button>
        </>
      )}
    </Composed>
  );
};

const _getRandom = entity => entity[Math.floor(Math.random() * entity.length)];

export default CreateFakeUsers;
