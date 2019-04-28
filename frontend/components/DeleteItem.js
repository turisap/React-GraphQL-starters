import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items.js'

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION ($id : ID!) {
        deleteItem(id : $id){
            id
        }
    }
`;

class DeleteItem extends Component {
    /**
     * Manually update cache on client to match server
     * @param cache
     * @param payload
     */
    update = (cache, payload) => {
        const data = cache.readQuery({ query : ALL_ITEMS_QUERY });
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        cache.writeQuery({
            query : ALL_ITEMS_QUERY,
            data
        })
    };

    render() {
        return (
            <Mutation
                mutation={DELETE_ITEM_MUTATION}
                variables={{id : this.props.id}}
                update={this.update}
            >
                {(deleteItem, {error}) => (
                    <button onClick={() => {
                        if(confirm('Are you sure you wanna delete this item?')) {
                            deleteItem()
                                // this is how to catch errors from backend
                                .catch(err => alert(err.message));
                        }
                    }}>{this.props.children}</button>
                )}
            </Mutation>
        );
    }
}

DeleteItem.propTypes = {
    id : PropTypes.string.isRequired
};

export default DeleteItem;
