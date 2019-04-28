import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from '../components/Item';
import Pagination from './Pagination';
import { CONFIG } from '../config';

const Center = styled.div`
    text-align: center;
`;

const ItemList = styled.div`
    display: grid;
    grid-template-columns : 1fr 1fr;
    grid-gap : 60px;
    max-width : {props => props.theme.maxWidth}
    margin: 0 auto;
`

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY ($skip : Int = 0, $first : Int = ${CONFIG.ITEMS_PER_PAGE}) {
        items (first : $first, skip : $skip, orderBy : createdAt_DESC) {
            id
            title
            price
            image
            largeImage
        }
    }
`;

class Items extends Component {
    render(){
        return(
            <Center>
                <p>Items</p>
                <Pagination page={this.props.page}/>
                <Query
                    query={ALL_ITEMS_QUERY}
                    variables={{
                        skip : (this.props.page - 1) * CONFIG.ITEMS_PER_PAGE
                    }}
                >
                    {({data, error, loading}) => {
                        if(loading) return <p>Loading..</p>
                        if(error) return <p>Error: {error.message}</p>
                        return (
                            <ItemList>
                                {data.items.map(item => <Item item={item} key={item.id}/>)}
                            </ItemList>
                        )
                    }}
                </Query>
                <Pagination page={this.props.page}/>
            </Center>
        )
    }
}

export default Items;
export { ALL_ITEMS_QUERY };