import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import DisplayError from "../../ErrorMessage";
import Loading from "../../Loading";

const USERS_PROJECTS_QUERY = gql`
  query USERS_PROJECTS_QUERY {
    myProjects {
      id
      title
      address
      image
      owner {
        id
        name
      }
    }
  }
`;

const PROJECTS = () => (
  <Query query={USERS_PROJECTS_QUERY}>
    {({ data, error, loading }) => {
      if (error) return <DisplayError error={error} />;
      if (loading) return <Loading />;
      if (!data.myProjects.length)
        return (
          <>
            <p>
              You don&apos;t have any projects yet. You can
              <Link href="/createProject">
                <a>create</a>
              </Link>
              one
            </p>
          </>
        );
    }}
  </Query>
);

export default PROJECTS;
