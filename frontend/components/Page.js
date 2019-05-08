import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Meta from "./Meta";
import SideBar from "./Sidebar";
import Footer from "./Footer";

class Page extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <>
        <Meta />
        <Header />
        <SideBar />
        <div className="page__contents">{this.props.children}</div>
        <Footer />
      </>
    );
  }
}

export default Page;
