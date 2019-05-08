import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Meta from "./Meta";
import SideBar from "./Sidebar";
import Footer from "./Footer";
import { Authentication } from "./Auth";

class Page extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  noAuthentication = ["SignUp", "SignIn"];

  requiresAuth = () => {
    return !this.noAuthentication.includes(this.props.children.type.name);
  };

  render() {
    return (
      <>
        {this.requiresAuth() ? (
          <Authentication>
            <Meta />
            <Header />
            <SideBar />
            <div className="page__contents">{this.props.children}</div>
            <Footer />
          </Authentication>
        ) : (
          <>
            <Meta />
            <Header />
            <SideBar />
            <div className="page__contents">{this.props.children}</div>
            <Footer />
          </>
        )}
      </>
    );
  }
}

export default Page;
