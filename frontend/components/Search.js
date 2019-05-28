import React from "react";
import Downshift from "downshift";
import { ApolloConsumer } from "react-apollo";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";

// const SEARCH_ITEMS_QUERY = gql`
//   query SEARCH_ITEMS_QUERY($searchTerm: String!) {
//     items(
//       where: {
//         OR: [
//           { title_contains: $searchTerm }
//           { description_contains: $searchTerm }
//         ]
//       }
//     ) {
//       id
//       title
//       image
//     }
//   }
// `;

class AutoComplete extends React.Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired
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
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      items: res.data.items,
      loading: false
    });
  }, 400);

  render() {
    return (
      <Downshift
        onChange={this.routeToItem}
        itemToString={item => (item === null ? "" : item.title)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex
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
            {isOpen && (
              <div>
                {this.state.items.map((item, index) => (
                  <div
                    {...getItemProps({ item })}
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                    <img width="50" src={item.image} alt={item.title} />
                    {item.title}
                  </div>
                ))}
                {!this.state.items.length && !this.state.loading && (
                  <div> Nothing Found {inputValue}</div>
                )}
              </div>
            )}
          </div>
        )}
      </Downshift>
    );
  }
}

export default AutoComplete;
