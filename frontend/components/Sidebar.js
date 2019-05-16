import React, { Component } from "react";
import Link from "next/link";
import UserWidget from "./UserWidget";

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <UserWidget />
        <Link href="/todos">
          <a className="sidebar__link">TODOs</a>
        </Link>
        <Link href="/link1">
          <a className="sidebar__link">Feature 2</a>
        </Link>
        <Link href="/link1">
          <a className="sidebar__link">Feature 3</a>
        </Link>
      </div>
    );
  }
}

export default SideBar;
