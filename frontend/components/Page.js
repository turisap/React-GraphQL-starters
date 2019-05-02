import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Meta from "./Meta";

class Page extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <>
        <Meta />
        <Header />
        <div className="page__contents">{this.props.children}</div>
      </>
    );
  }
}

export default Page;
