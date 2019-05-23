import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../../Loading';
import DisplayError from "../../ErrorMessage";
import UserWidget from '../../UserWidget';

const PROJECT_PARTICIPANTS_QUERY = gql`
  query PROJECT_PARTICIPANTS_QUERY  {
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
    return(
      <Query query={PROJECT_PARTICIPANTS_QUERY}>
        {({ data, error, loading }) => {
          if(loading) return <Loading/>;
          if(error) return <DisplayError/>;
          return (
            data.projectsParticipants.map(participant => <UserWidget participant={participant}/>)
          )
        }}
      </Query>
    )
  }
}

export default PEOPLE;