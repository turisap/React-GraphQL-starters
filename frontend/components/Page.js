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

  /**
   * Pages which do not require authentication
   * @type {string[]}
   */
  noAuthentication = [
    "SignUpPage",
    "SignIn",
    "VerifyEmailPage",
    "SignUpPageSucces",
    "RequestResetPage",
    "ResetPasswordPage"
  ];

  /**
   * This method checks if the child page requires authentication
   * @returns {boolean}
   */
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
            <div className="service__page">{this.props.children}</div>
          </>
        )}
      </>
    );
  }
}

export default Page;
