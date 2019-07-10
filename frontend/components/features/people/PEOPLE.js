import React, { Component } from "react";
import { Query } from "react-apollo";
import Link from "next/link";
import gql from "graphql-tag";
import Loading from "../../Loading";
import DisplayError from "../../ErrorMessage";
import ParticipantWidget from "./ParticipantWidget";
import PageHeading from "../../PageHeading";

const PROJECT_PARTICIPANTS_QUERY = gql`
  query PROJECT_PARTICIPANTS_QUERY {
    projectParticipants {
      id
      name
      email
      occupation {
        title
      }
      image
    }
  }
`;

class PEOPLE extends Component {
  render() {
    return (
      <Query query={PROJECT_PARTICIPANTS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Loading />;
          if (error) return <DisplayError />;
          const addParticipantLink = (
            <>
              <Link href="/addParticipant">
                <a className="peoplePage__addLink">ADD</a>
              </Link>
            </>
          );
          if (!data.projectParticipants.length)
            return (
              <p>
                You don&apos;t have any participants in this project.
                {addParticipantLink}
              </p>
            );
          return (
            <div className="peoplePage">
              <PageHeading
                src={"people.png"}
                pageTitle={"You can find employees for the current project "}
                alt={"ladder"}
                pictureClassName={"peoplePage__image"}
                pageAnnotation={"You can add other participants"}
              />
              <div className={"peoplePage__people"}>
                {data.projectParticipants.map(participant => (
                  <ParticipantWidget
                    key={participant.id}
                    participant={participant}
                  />
                ))}
                {addParticipantLink}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default PEOPLE;
