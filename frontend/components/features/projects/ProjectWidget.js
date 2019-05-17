import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Cookies from 'universal-cookie';

const ProjectWidget = ({ project }) => {

  const { title, address, image, owner, id } = project;
  return (
    <div className="projectWidget"
         onClick={() => {
           const cookies = new Cookies();
           cookies.set('projectId', id, { path : '/'});
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
