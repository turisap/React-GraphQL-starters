import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const ProjectWidget = ({ project }) => {
  const { title, address, image, owner, id } = project;
  return (
    <div className="projectWidget">
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
