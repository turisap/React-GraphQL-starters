import React from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Nav from "./Nav";
import { CONFIG } from "../config";

/**
 * Listening for Router events to trigger nprogress bar
 */
Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <>
    <nav>
      <div className="nav__left">
        <Link href="/">
          <a className="nav__link nav__logo hvr-shadow">{CONFIG.APP_NAME}</a>
        </Link>
      </div>
      <Nav />
    </nav>
  </>
);

export default Header;
