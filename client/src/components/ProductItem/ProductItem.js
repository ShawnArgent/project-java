import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { pluralize } from '../../util/helpers';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../util/actions';
import { idbPromise } from '../../util/helpers';

function CoffeeItem(item) {
  const { image, name, roast, quantity, price, tastingProfile, location, locationHistory, _id } = item;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if there was a match, call UPDATE for purchase quantity
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });

      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className='card'>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <Link to={`/coffee/_id={product._id}`}>
            <img alt={name} src={`/images/${image}`} />
          </Link>
        </figure>
      </div>
      <div className='card-content'>
        <div className='media'>
          <div className='media-content'>
            <p className='title is-4'>{name}</p>
            <p className='subtitle is-6'>{roast}</p>
          </div>
        </div>

        <div className='content'>
          <ul>
            <li>{location}</li>
            <li>{tastingProfile}</li>
            <li>{locationHistory}</li>
            <li>{price}</li>
            <li>
              {quantity} {pluralize('item', quantity)}
            </li>
          </ul>
          <button onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeItem;
