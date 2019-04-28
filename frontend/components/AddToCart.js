import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from "./User";

const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION ($id : ID!) {
        addToCart(id : $id) {
            id
            quantity
        }
    }
`;

class AddToCart extends React.Component {
    render(){
        const { id } = this.props;
        return (
            <Mutation
                mutation={ADD_TO_CART_MUTATION}
                variables={{id}}
                refetchQueries={[
                    { query : CURRENT_USER_QUERY }
                ]}
            >
                {(addToCart, {loading, error}) => (
                    <button
                        disabled={loading}
                        onClick={addToCart}>
                        Add{loading && 'ing'} to Cart
                    </button>
                )}
            </Mutation>
        )
    }
}

export default AddToCart;
export { ADD_TO_CART_MUTATION };