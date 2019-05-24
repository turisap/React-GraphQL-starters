import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import UserWidget from "./UserWidget";
import Cookies from "universal-cookie";
import DisplayError from "./ErrorMessage";
import Loading from "./Loading";

/**
 * Verifies whether or not project with id from cookies exists in the db
 */
const VERIFY_PROJECT_EXISTENSE = gql`
  query VERIFY_PROJECT_QUERY($projectId: ID!) {
    project(where: { id: $projectId }) {
      id
    }
  }
`;

const cookies = new Cookies();

class SideBar extends Component {
  render() {
    const projectId = cookies.get("projectId");
    return (
      <div className="sidebar">
        <UserWidget />
        <Query query={VERIFY_PROJECT_EXISTENSE} variables={{ projectId }}>
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <DisplayError error={error} />;
            if (!data.project)
              return (
                <Link href="/">
                  <a className="sidebar__link">Projects</a>
                </Link>
              );
            if (data.project.id)
              return (
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
                  {process.env.NODE_ENV === "development" && (
                    <Link href="/faker">
                      <a className="sidebar__link">Fake Data</a>
                    </Link>
                  )}
                </>
              );
            return null;
          }}
        </Query>
      </div>
    );
  }
}

export default SideBar;
