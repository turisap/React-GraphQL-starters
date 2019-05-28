import React from "react";
import ExistingOccupations from "../../ExistingOccupations";
import Search from "../../Search";
import { SaveToState } from "../../abstractions/SaveToState";
import gql from "graphql-tag";

const SEARCH_BY_NAME_QUERY = gql`
  query SEARCH_BY_NAME_QUERY($searchTerm: String!) {
    searchInOrganizationByName(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      title
      image
    }
  }
`;

class AddParticipant extends SaveToState {
  render() {
    return (
      <fieldset disabled={false} aria-busy={false}>
        <ExistingOccupations />
        <Search />
      </fieldset>
    );
  }
}

export default AddParticipant;
