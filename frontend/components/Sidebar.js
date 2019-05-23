import React, { Component } from "react";
import Link from "next/link";
import UserWidget from "./UserWidget";
import Cookies from "universal-cookie";

// const LOCAL_STATE_PROJECTID_QUERY = gql`
//   {
//     projectId @client
//   }
// `;

const cookies = new Cookies();

class SideBar extends Component {
  render() {
    const projectId = cookies.get("projectId");
    return (
      <div className="sidebar">
        <UserWidget />
        {projectId && (
          <>
            <Link href="/">
              <a className="sidebar__link">Projects</a>
            </Link>
            <Link href="/jobs">
              <a className="sidebar__link">TODOs</a>
            </Link>
            <Link href="/people">
              <a className="sidebar__link">HR</a>
            </Link>
            <Link href="/link1">
              <a className="sidebar__link">Feature 3</a>
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default SideBar;
