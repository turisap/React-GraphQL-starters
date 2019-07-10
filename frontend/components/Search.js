import React from "react";
import Downshift from "downshift";
import { ApolloConsumer } from "react-apollo";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import gql from "graphql-tag";

const LOCAL_STATE_SEARCH_ITEMS_MUTATION = gql`
  mutation setSearchItems($searchItems: String!) {
    setSearchItems(searchItems: $searchItems) @client
  }
`;

class AutoComplete extends React.Component {
  static propTypes = {
    searchQuery: PropTypes.object.isRequired,
    itemsTitle: PropTypes.string.isRequired,
    variables: PropTypes.object
  };

  state = {
    items: [],
    loading: false
  };

  onChange = debounce(async (e, client) => {
    //console.log("Searching");
    this.setState({ loading: true });
    // manually query apollo client
    const res = await client.query({
      query: this.props.searchQuery,
      variables: { searchTerm: e.target.value, ...this.props.variables }
    });
    await client.mutate({
      mutation: LOCAL_STATE_SEARCH_ITEMS_MUTATION,
      variables: {
        searchItems: res.data[this.props.itemsTitle].map(i => JSON.stringify(i))
      }
    });

    this.setState({
      items: res.data[this.props.itemsTitle],
      loading: false
    });
  }, 400);

  render() {
    return (
      <Downshift itemToString={item => (item === null ? "" : item.title)}>
        {({
          getInputProps
        }) => (
          <div>
            <ApolloConsumer>
              {client => (
                <input
                  {...getInputProps({
                    type: "search",
                    placeholder: "Search For A Name",
                    id: "search",
                    className: this.state.loading ? "loading" : "",
                    onChange: e => {
                      e.persist();
                      this.onChange(e, client);
                    }
                  })}
                />
              )}
            </ApolloConsumer>
          </div>
        )}
      </Downshift>
    );
  }
}

export default AutoComplete;
