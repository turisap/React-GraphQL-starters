import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import DisplayError from "../../ErrorMessage";
import Loading from "../../Loading";
import ProjectWidget from "./ProjectWidget";

const USERS_PROJECTS_QUERY = gql`
  query USERS_PROJECTS_QUERY {
    myProjects {
      id
      title
      address
      image
      owner {
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
          <div>
            <p>
              You don&apos;t have any projects yet. You can
              <Link href="/createProject">
                <a>create</a>
              </Link>
              one
            </p>
          </div>
        );
      return (
        <div className="projects__layout">
          {data.myProjects.map(project => (
            <ProjectWidget project={project} key={project.id} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default PROJECTS;
