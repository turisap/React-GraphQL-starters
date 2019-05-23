import React from "react";
import PropTypes from "prop-types";

const ParticipantWidget = ({ participant }) => {
  const { name, image, position, email } = participant;
  <div className="participant__widget">
    <img src={image} className="participant__avatar" />
    <p>{name}</p>
    <p>{position}</p>
    <p>{email}</p>
  </div>;
};

ParticipantWidget.PropTypes = {
  participant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    position: PropTypes.string,
    email: PropTypes.string.isRequired
  })
};

export default ParticipantWidget;
