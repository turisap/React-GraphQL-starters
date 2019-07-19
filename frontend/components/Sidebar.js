import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faList,
  faUserCheck
} from "@fortawesome/free-solid-svg-icons";
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


const SideBar = () => {
  const [flag, setFlag] = useState(false);

  const projectId = cookies.get("currentProject");
  console.log("PROJECT ID SIDEBAR", projectId)
  return (
    <>
      <div className={cn("sidebar", { open: flag }, { closed: !flag })}>
        <div
          onClick={() => setFlag(!flag)}
          aria-expanded={flag}
          className="sidebar__toggle"
        >
          <span className="open">☰</span>
          <span className="close">×</span>
        </div>
        <UserWidget />
        <Link href="/">
          <a className="sidebar__link">
            <FontAwesomeIcon icon={faProjectDiagram} size="2x" />{" "}
            <span>Projects</span>
          </a>
        </Link>
        {projectId && (
          <Query
            query={PROJECT_EXISTS_AND_BELONGS_TO_USER}
            variables={{ projectId }}
          >
            {({ data, loading, error }) => {
              if (loading)
                return (
                  <>
                    <a href="#" className="sidebar__link">
                      <div className="sidebar__placeholder"></div>
                    </a>
                    <a href="#" className="sidebar__link">
                      <div className="sidebar__placeholder"></div>
                    </a>
                  </>
                );
              if (error) return <DisplayError error={error} />;

              if (data.projectExistsAndBelongsToUser)
                return (
                  <>
                    <Link href="/jobs">
                      <a className="sidebar__link">
                        {" "}
                        <FontAwesomeIcon icon={faList} size="2x" />
                        <span>TODOs</span>
                      </a>
                    </Link>
                    <Link href="/people">
                      <a className="sidebar__link">
                        <FontAwesomeIcon icon={faUserCheck} size="2x" />{" "}
                        <span>HR</span>
                      </a>
                    </Link>
                  </>
                );
              return null;
            }}
          </Query>
        )}
        {process.env.NODE_ENV === "development" && (
          <Link href="/faker">
            <a className="sidebar__linkDev">
              <span>Fake Data {`{ development only }`}</span>
            </a>
          </Link>
        )}
      </div>
    </>
  );
};

export default SideBar;
