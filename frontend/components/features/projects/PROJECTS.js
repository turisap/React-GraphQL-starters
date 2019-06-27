import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
      const jsx = [];
      jsx.push([
        <img src="../../../static/projects.png" alt="projects image" className="projects__image"/>,
          <h2 className="page__heading">You can find all your projects here</h2>,
          <p className="page__annotation">You need to choose one to work with</p>
      ])
      const createBtn = (
        <div className="projects__createButton">
          <Link href="/createProject">
            <a href=''><FontAwesomeIcon icon={faPlus} size="5x"/></a>
          </Link>
        </div>
      );
      if (!data.myProjects.length) return createBtn;
      jsx.push(
        data.myProjects.map(project => (
          <ProjectWidget project={project} key={project.id} />
        ))
      );
      return (
        <div className="projects__layout">
          {jsx}
          {createBtn}
        </div>
      );
    }}
  </Query>
);

export default PROJECTS;
export { USERS_PROJECTS_QUERY };
