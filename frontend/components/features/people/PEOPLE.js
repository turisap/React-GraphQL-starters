import React, { Component } from "react";
import { Query } from "react-apollo";
import Link from "next/link";
import gql from "graphql-tag";
import Loading from "../../Loading";
import DisplayError from "../../ErrorMessage";
import UserWidget from "../../UserWidget";

const PROJECT_PARTICIPANTS_QUERY = gql`
  query PROJECT_PARTICIPANTS_QUERY {
    projectParticipants {
      id
      name
      email
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
                <a>Add one</a>
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
          return data.projectParticipants.map(participant => (
            <>
              <UserWidget key={participant.id} participant={participant} />
              {addParticipantLink}
            </>
          ));
        }}
      </Query>
    );
  }
}

export default PEOPLE;
