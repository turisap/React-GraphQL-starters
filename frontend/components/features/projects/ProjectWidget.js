import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Cookies from "universal-cookie";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import cn from 'classnames';

const LOCAL_STATE_PROJECTID_MUTATION = gql`
  mutation setProjectId($projectId: String!) {
    setProjectId(projectId: $projectId) @client
  }
`;

const ProjectWidget = ({ project, active }) => {
  const { title, address, image, owner, id } = project;
  return (
    <Mutation
      mutation={LOCAL_STATE_PROJECTID_MUTATION}
      variables={{ projectId: id }}
    >
      {setProjectId => (
        <div
          className={cn("projectWidget", {projectWidgetActive: active})}
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
              {image && <img src={image} className="projectWidget__image" />}
              <h3 className="projectWidget__title">{title}</h3>
              <p className="projectWidget__address">{address}</p>
              <p className="projectWidget__name">
                <span className="text--subtle">Supervisor: </span>
                {owner.name}
              </p>
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
