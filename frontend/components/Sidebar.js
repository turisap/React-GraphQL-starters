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
 * and checks if it belongs to the logged in user
 */
const PROJECT_EXISTS_AND_BELONGS_TO_USER = gql`
  query VERIFY_PROJECT_QUERY($projectId: ID!) {
    projectExistsAndBelongsToUser(projectId: $projectId)
  }
`;

const cookies = new Cookies();

// TODO add an animation for loading buttons as it is done in gitbook dashboard https://app.gitbook.com/

class SideBar extends Component {
  render() {
    const projectId = cookies.get("projectId");
    return (
      <div className="sidebar">
        <UserWidget />
        <Link href="/">
          <a className="sidebar__link">Projects</a>
        </Link>
        {projectId && (
          <Query
            query={PROJECT_EXISTS_AND_BELONGS_TO_USER}
            variables={{ projectId }}
          >
            {({ data, loading, error }) => {
              if (loading) return <Loading />;
              if (error) return <DisplayError error={error} />;

              if (data.projectExistsAndBelongsToUser)
                return (
                  <>
                    <Link href="/jobs">
                      <a className="sidebar__link">TODOs</a>
                    </Link>
                    <Link href="/people">
                      <a className="sidebar__link">HR</a>
                    </Link>
                  </>
                );
              return null;
            }}
          </Query>
        )}
        {process.env.NODE_ENV === "development" && (
          <Link href="/faker">
            <a className="sidebar__link">Fake Data</a>
          </Link>
        )}
      </div>
    );
  }
}

export default SideBar;
