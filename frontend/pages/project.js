import React from "react";
import PropTypes from "prop-types";
import ProjectInfo from "../components/features/projects/ProjectInfo";

const ProjectPage = props => <ProjectInfo projectId={props.query.id} />;

ProjectPage.propTypes = {
  query: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default ProjectPage;
