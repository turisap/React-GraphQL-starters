import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import { SaveToState } from "./abstractions/SaveToState";

const EXISTING_OCCUPATIONS = gql`
    query EXISTING_OCCUPATIONS {
        occupations {
            id
            title
        }
    }
`;

class ExistingOccupations extends SaveToState {
  static propTypes = {
    changeHandler : PropTypes.func
  };

  render() {
    return (
      <Query query={EXISTING_OCCUPATIONS}>
        {({ data }) => (
          <label>
            Occupation
            <select
              required
              name="occupation"
              placeholder="Occupation"
              onChange={this.props.changeHandler}
              defaultValue="Occupation"
            >
              {data.occupations.map(occupation => (
                <option key={occupation.id} value={occupation.id}>
                  {occupation.title}
                </option>
              ))}
            </select>
          </label>
        )}
      </Query>
    )
  }
}


export default ExistingOccupations;