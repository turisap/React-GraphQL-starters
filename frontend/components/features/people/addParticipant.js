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
      <div className="addParticipant">
        <div className="addParticipant__form">
          <ExistingOccupations changeHandler={this.saveToState} />
          <Search
            itemsTitle="searchInOrganizationByName"
            searchQuery={SEARCH_BY_NAME_QUERY}
            variables={{ occupation: this.state.occupation }}
          />
        </div>
        <Query query={LOCAL_STATE_SEARCH_ITEMS_QUERY}>
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (data.searchItems && data.searchItems.length) {
              return (
                <div className="addParticipant__items">
                  {data.searchItems.map(participant => (
                    <ParticipantWidget
                      key={JSON.parse(participant).id}
                      participant={JSON.parse(participant)}
                    />
                  ))}
                </div>
              );
            }
            return <div className="addParticipant__message">
              Nothing to show
              <p className>Please change search terms</p>
            </div>;
          }}
        </Query>
      </div>
    );
  }
}

export default AddParticipant;
