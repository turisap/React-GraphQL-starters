import React from "react";
import PropTypes from 'prop-types';

const Loading = ({ loading }) => <>{loading ? <p>Loading.. </p> : ""}</>;

Loading.propTypes = {
  loading : PropTypes.bool.isRequired
};

export default Loading;
