import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Loading from '../../Loading';
import Error from "../../ErrorMessage";

const PROJECT_QUERY = gql`
  query PROJECT_QUERY ( $id : ID! ) {
      project ( where : { id : $id }) {
          id
          title
          address
          levels_number
          image
          largeImage
          owner {
              name
              id
          }
      }
  }
`;

// TODO general info about a project
class ProjectInfo extends Component {
  static propTypes = {
    projectId : PropTypes.string.isRequired,
  };

  render(){
    return (
      <Query query={PROJECT_QUERY} variables={ { id : this.props.projectId }}>
        {({data, error, loading }) => {
          if (loading) return <Loading/>;
          if (error) return <Error error={error}/>;
          const { title, address, levels_number, owner} = data.project;
          return (
            <>
              <h2>Project name: {title}</h2>
              <p>Address: {address}</p>
              <p>Level numbers: {levels_number}</p>
              <p>Supervisor: {owner.name}</p>
            </>
          )
        }}
      </Query>
    )
  }
}


export default ProjectInfo;

