import React from 'react';
import { Mutation } from 'react-apollo';
import StripeCheckOut from 'react-stripe-checkout';
import Router from 'next/router';
import NProgress from 'nprogress';
import Proptypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY} from "./User";
import { CONFIG } from '../config';

const  CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token : String!) {
        createOrder(token : $token) {
            id
            charge
            total
            items {
                id
                title
            }
        }
    }
`;

class CheckOut extends React.Component {

    totalItems = cart => cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);

    onToken = async (res, createOrder) => {
        //console.log(res);
        NProgress.start();
        const order = await createOrder({
            variables : {
                token : res.id
            }
        })
            .catch(err => alert(err.message))

        Router.push({
            pathname : '/order',
            query : { id : order.data.createOrder.id }
        })
    }

    render() {
        return (
            <User>
                {({data : { me }}) => (
                    <Mutation
                        mutation={CREATE_ORDER_MUTATION}
                        refetchQueries={[{ query : CURRENT_USER_QUERY }]}
                    >
                        {createOrder => (
                            <StripeCheckOut
                                amount={calcTotalPrice(me.cart)}
                                name={CONFIG.SHOP_NAME}
                                description={`Order of ${this.totalItems(me.cart)} items`}
                                image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
                                stripeKey={CONFIG.STRIPE_PUBLISHABLE_KEY}
                                currency={CONFIG.CURRENCY}
                                email={me.email}
                                token={res => this.onToken(res, createOrder)}
                            >{this.props.children}</StripeCheckOut>
                        )}
                    </Mutation>
                )}
            </User>
        )
    }
}

export default CheckOut;