import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../util/helpers';
import { useStoreContext } from '../../util/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../util/actions';
import { idbPromise } from '../../util/helpers';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, _id, name, category, price, type, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      console.log(itemInCart);
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
          <Link to={`/products/${_id}`}>
            <img alt={name} src={`/images/${image}`} />
            <p>{name}</p>
          </Link>
        </figure>
      </div>
      <div>
        {quantity} {pluralize('item', quantity)} in stock{' '}
      </div>

      <div className='card-content'>
        <div className='media'>
          <div className='media-content'>
            <p className='title is-4'>{name}</p>
            <p className='subtitle is-6'>{category}</p>
            <p className='subtitle is-6'>${price}</p>
            <p className='subtitle is-6'>{type}</p>
            <button onClick={addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
