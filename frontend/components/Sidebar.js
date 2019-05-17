import React, { Component } from "react";
import Link from "next/link";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import UserWidget from "./UserWidget";

const LOCAL_STATE_PROJECTID_QUERY = gql`
  {
    projectId @client
  }
`;

class SideBar extends Component {
  render() {
    return (
      <Query query={LOCAL_STATE_PROJECTID_QUERY}>
        {({ data }) => {
          return (
            <div className="sidebar">
              <UserWidget />
              {data.projectId && (
                <>
                  <Link href="/todos">
                    <a className="sidebar__link">TODOs</a>
                  </Link>
                  <Link href="/link1">
                    <a className="sidebar__link">Feature 2</a>
                  </Link>
                  <Link href="/link1">
                    <a className="sidebar__link">Feature 3</a>
                  </Link>
                </>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SideBar;
