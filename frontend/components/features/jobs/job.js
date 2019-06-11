import React from "react";
import PropTypes from "prop-types";


/**
 * Renders a job widget
 * @param title
 * @param level
 * @param unit
 * @param tag
 * @returns {*}
 * @constructor
 */
const Job = ({ title, level, unit, tag }) => (
  <div>
    <h3>{title}</h3>
    <p>Level: {level}</p>
    <p>Unit: {unit}</p>
    <p>Tag: {tag.title}</p>
  </div>
);

Job.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  tag: PropTypes.object.shape({
    title: PropTypes.string.isRequired,
    jobGroup: PropTypes.string.isRequired
  })
};

export default Job;
