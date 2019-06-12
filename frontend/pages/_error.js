import React from "react";

class Error extends React.Component {
  /* eslint-disable react/prop-types */
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    );
  }
  /* eslint-enable react/prop-types */
}

export default Error;
