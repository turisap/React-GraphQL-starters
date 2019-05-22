import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Cookies from "universal-cookie";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOCAL_STATE_PROJECTID_MUTATION = gql`
  mutation setProjectId($projectId: String!) {
    setProjectId(projectId: $projectId) @client
  }
`;

const ProjectWidget = ({ project }) => {
  const { title, address, image, owner, id } = project;
  return (
    <Mutation
      mutation={LOCAL_STATE_PROJECTID_MUTATION}
      variables={{ projectId: id }}
    >
      {setProjectId => (
        <div
          className="projectWidget"
          onClick={() => {
            const cookies = new Cookies();
            cookies.remove("projectId", { path: "/" });
            cookies.set("projectId", id, { path: "/" });
            setProjectId();
          }}
        >
          <Link
            href={{
              pathname: "/project",
              query: {
                id
              }
            }}
          >
            <a>
              <img src={image} className="projectWidget__image" />
              <h2 className="projectWidget__title">{title}</h2>
              <p className="projectWidget__address">{address}</p>
              <p className="projectWidget__name">{owner.name}</p>
            </a>
          </Link>
        </div>
      )}
    </Mutation>
  );
};

ProjectWidget.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    owner: PropTypes.object.isRequired
  })
};

export default ProjectWidget;
