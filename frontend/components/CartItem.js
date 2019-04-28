import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({cartItem}) => {
    if(!cartItem.item) return <CartItemStyles>This item has been removed</CartItemStyles>;
    const { price, title, image, description } = cartItem.item;
    return (
        <CartItemStyles>
            <img width={"100"} src={image} alt={title}/>
            <div className="cart-item-details">
                <h3>{title}</h3>
                <p>
                    {formatMoney(price * cartItem.quantity )}
                    { "-" }
                    <em>
                        {cartItem.quantity} &times; {formatMoney(price)} each
                    </em>
                </p>
            </div>
            <RemoveFromCart itemId={cartItem.id}/>
        </CartItemStyles>
    )
};

CartItem.propTypes = {
    cartItem : PropTypes.object.isRequired
}

export default CartItem;
