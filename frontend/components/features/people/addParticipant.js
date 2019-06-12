import React from "react";
import { Query } from "react-apollo";
import ExistingOccupations from "../../ExistingOccupations";
import Search from "../../Search";
import { SaveToState } from "../../abstractions/SaveToState";
import Loading from "../../Loading";
import ParticipantWidget from "./ParticipantWidget";
import gql from "graphql-tag";

const SEARCH_BY_NAME_QUERY = gql`
  query SEARCH_BY_NAME_QUERY($searchTerm: String!, $occupation: String!) {
    searchInOrganizationByName(
      searchTerm: $searchTerm
      occupation: $occupation
    ) {
      id
      name
      email
      image
      occupation {
        title
      }
    }
  }
`;

const LOCAL_STATE_SEARCH_ITEMS_QUERY = gql`
  query {
    searchItems @client
  }
`;

class AddParticipant extends SaveToState {
  state = {
    occupation: ""
  };

  render() {
    return (
      <>
        <fieldset>
          <ExistingOccupations changeHandler={this.saveToState} />
          <Search
            itemsTitle="searchInOrganizationByName"
            searchQuery={SEARCH_BY_NAME_QUERY}
            variables={{ occupation: this.state.occupation }}
          />
        </fieldset>
        <Query query={LOCAL_STATE_SEARCH_ITEMS_QUERY}>
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (data.searchItems && data.searchItems.length) {
              return data.searchItems.map(participant => (
                <ParticipantWidget
                  key={JSON.parse(participant).id}
                  participant={JSON.parse(participant)}
                />
              ));
            }
            return <p>Nothing has been found</p>;
          }}
        </Query>
      </>
    );
  }
}

export default AddParticipant;
