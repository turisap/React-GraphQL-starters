import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from '../components/ErrorMessage';
import { CONFIG } from '../config';



const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title : String!
        $description : String!
        $price : Int!
        $image : String
        $largeImage : String
    ) {
        createItem(
            title : $title
            description : $description
            price : $price
            image : $image
            largeImage : $largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title : '',
        description : '',
        image : '',
        largeImage : '',
        price : 0
    };

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name] : val });
    };

    uploadFile = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', CONFIG.CLOUDINARY_PRESET);

        const res = await fetch(CONFIG.CLOUDINARY_ENDPOINT, {
            method : "POST",
            body : data
        });

        const file = await res.json();
        this.setState({
            image : file.secure_url,
            largeImage : file.eager[0].secure_url
        })
    }

    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, {loading, error}) => (
                    <Form
                        data-test="create-item-form"
                        onSubmit={async e => {
                        e.preventDefault();
                        // calling the mutation function and redirect user
                        const res = await createItem();
                        Router.push({
                            pathname : '/item',
                            query : { id : res.data.createItem.id }
                        })
                    }}>
                        <ErrorMessage error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor={'file'}>
                                Picture
                                <input
                                    type={'file'}
                                    id={'file'}
                                    name={'file'}
                                    placeholder={'Upload a picture'}
                                    required
                                    onChange={this.uploadFile}
                                />
                                {this.state.image && <img width="200" src={this.state.image} alt={"Upload preview"}/>}
                            </label>
                            <label htmlFor={'title'}>
                                Title
                                <input
                                    type={'text'}
                                    id={'title'}
                                    name={'title'}
                                    placeholder={'Title'}
                                    required
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor={'price'}>
                                Price
                                <input
                                    type={'number'}
                                    id={'price'}
                                    name={'price'}
                                    placeholder={'Price'}
                                    required
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor={'price'}>
                                Description
                                <textarea
                                    id={'description'}
                                    name={'description'}
                                    placeholder={'Enter a description'}
                                    required
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </fieldset>
                        <button>SUBMIT</button>
                    </Form>
                )}
            </Mutation>
        );
    }
}

CreateItem.propTypes = {};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
