import React from "react";
import PropTypes from "prop-types";

const ParticipantWidget = ({ participant }) => {
  const { name, image, occupation, email } = participant;
  return (
    <div className="participant__widget">
        <div className="participant__holder">
            <img src={image} className="participant__avatar" />
        </div>
      <p>{name}</p>
      <p>{occupation.title}</p>
      <p>{email}</p>
    </div>
  );
};

ParticipantWidget.propTypes = {
  participant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    position: PropTypes.string,
    email: PropTypes.string.isRequired
  })
};

export default ParticipantWidget;
