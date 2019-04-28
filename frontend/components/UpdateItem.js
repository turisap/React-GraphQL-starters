import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import * as CONFIG from '../config';
import ErrorMessage from './ErrorMessage';


const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY ($id : ID!) {
        item (where : { id : $id}) {
            id
            title
            description
            price
        }
    }
`;
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION (
        $id : ID!
        $title : String
        $description : String
        $price : Int
    ){
        updateItem (
            id : $id
            title : $title
            description : $description
            price : $price,
        )
        {
            id
            title
            description
            price
        }
    }
`;

class UpdateItem extends Component {
    state = {};

    /**
     * This is only one handler which works with all inputs at once (lecture 17)
     * @param e
     */
    handleChange = e => {
        // destructuring the synthetic event and obtaining value as well as type and name of the input
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name] : val});
    };

    updateItem = async (e, updateItemMutation) => {
        e.preventDefault();
        const item = await updateItemMutation({
           variables : {
               id : this.props.id,
               ...this.state
           }
        });
    };


    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id : this.props.id}}>
                {({data, loading}) => {
                    if (loading) return <p>Loading...</p>
                    if(!data.item) return <p>No item found for id {this.props.id}</p>
                    return (
                        <Mutation
                            mutation={UPDATE_ITEM_MUTATION}
                            variables={this.state}
                        >
                            {(updateItemMutation, { loading, error }) => (
                                <Form onSubmit={ e => this.updateItem(e, updateItemMutation)}>
                                    <ErrorMessage error={error}/>
                                    {/** setting loading animations and disabling inputs while submitting the form **/}
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <label htmlFor="title">
                                            {/**Pay attention to defaultValue, which sets initial input values to the data loaded**/}
                                            Title
                                            <input
                                                defaultValue={data.item.title}
                                                onChange={this.handleChange}
                                                type="text"
                                                id="title"
                                                name="title"
                                                placeholder="title"
                                                required
                                            />
                                        </label>
                                        <label htmlFor="price">
                                            Price
                                            <input
                                                defaultValue={data.item.price}
                                                onChange={this.handleChange}
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder="price"
                                                required
                                            />
                                        </label>
                                        <label htmlFor="description">
                                            Description
                                            <textarea
                                                defaultValue={data.item.description}
                                                onChange={this.handleChange}
                                                id="description"
                                                name="description"
                                                placeholder="description"
                                                required
                                            />
                                        </label>
                                    </fieldset>
                                    <button>Sav{loading ? 'ing' : 'e'} changes</button>
                                </Form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        );
    }
}

UpdateItem.propTypes = {};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
