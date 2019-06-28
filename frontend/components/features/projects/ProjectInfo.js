import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Loading from "../../Loading";
import Error from "../../ErrorMessage";
import PageHeading from "../../PageHeading";

const PROJECT_QUERY = gql`
  query PROJECT_QUERY {
    project {
      id
      title
      address
      levels_number
      image
      largeImage
      owner {
        name
        id
      }
    }
  }
`;

class ProjectInfo extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired
  };

  render() {
    // TODO add functionality of adding people to projects
    return (
      <Query query={PROJECT_QUERY} fetchPolicy="network-only">
        {({ data, error, loading }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;
          const { title, address, levels_number, owner } = data.project;
          return (
            <div className="projectsInfo__layout">
              <PageHeading
                src={"project__info.png"}
                pageTitle={`${title} project information`}
                alt={"project info"}
                pageAnnotation={
                  "All the other tabs work with this project until your switch it"
                }
                pictureClassName={"projectInfo__image"}
              />
              <div className="projectInfo__info">
                <h2>
                  <span className="projectInfo__annotation">Project name:</span> {title}
                </h2>
                <p>
                  <span className="projectInfo__annotation">Address:</span> {address}
                </p>
                <p>
                  <span className="projectInfo__annotation">Level numbers:</span> {levels_number}
                </p>
                <p>
                  <span className="projectInfo__annotation">Supervisor:</span> {owner.name}
                </p>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProjectInfo;
