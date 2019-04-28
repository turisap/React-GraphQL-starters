import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import Head from 'next/head';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import {CONFIG} from "../config";
import formatMoney from '../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id : ID!) {
        order(id : $id) {
            id
            charge
            total
            createdAt
            user {
                id
            }
            items {
                id
                title
                description
                price
                image
                quantity
            }
        }
    }
`

class Order extends React.Component {
    static propTypes = {
        id : PropTypes.string.isRequired
    };

    render(){
        return(
            <Query query={SINGLE_ORDER_QUERY} variables={{id : this.props.id}}>
                {({data, error, loading}) => {
                    if(error) return <Error error={error}/>;
                    if(loading) return <p>Loading..</p>;
                    const { order } = data;
                    return (
                        <OrderStyles>
                            <Head>
                                <title>{CONFIG.SHOP_NAME} - Order ID : {order.id}</title>
                            </Head>
                            <p>
                                <span>Order ID : {order.id}</span>
                            </p>
                            <p>
                                <span>Charge : {order.charge}</span>
                            </p>
                            <p>
                                <span>Date : {format(order.createdAt, 'MMM D, YYY h:mm A')}</span>
                            </p>
                            <p>
                                <span>Order Total : {formatMoney(order.total)}</span>
                            </p>
                            <p>
                                <span>Item Total : {order.items.length}</span>
                            </p>
                            <div className="items">
                                {order.items.map(item => (
                                    <div className="order-item" key={item.id}>
                                        <img src={item.image} alt={item.title} />
                                        <div className="item-details">
                                            <h2>{item.title}</h2>
                                            <p>Qty: {item.quantity}</p>
                                            <p>Each: {formatMoney(item.price)}</p>
                                            <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </OrderStyles>
                    )
                }}
            </Query>
        )
    }
}

export default Order;