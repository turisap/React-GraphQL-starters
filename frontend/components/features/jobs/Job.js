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
const Job = ({ job: { title, level, unit, tag } }) => (
  <div className="jobWidget">
    <h2 className="jobWidget__title">{title}</h2>
    <p>Level: {level}</p>
    <p>Unit: {unit}</p>
    <p><span className="jobWidget__annotation">{tag.title}</span></p>
  </div>
);

Job.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    tag: PropTypes.shape({
      title: PropTypes.string.isRequired,
      jobGroup: PropTypes.string.isRequired
    })
  })
};

export default Job;
