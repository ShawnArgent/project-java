import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Cart from '../components/Cart';
import { useStoreContext } from '../util/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART, UPDATE_COFFEES } from '../util/actions';
import { QUERY_COFFEE } from '../util/queries';
import { idbPromise } from '../util/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentCoffee, setCurrentCoffee] = useState({});

  const { loading, data } = useQuery(QUERY_COFFEE);

  const { coffees, cart } = state;

  useEffect(() => {
    // already in global store
    if (coffees.length) {
      setCurrentCoffee(coffees.find((coffee) => coffee._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_COFFEES,
        coffees: data.coffees,
      });

      data.coffees.forEach((coffee) => {
        idbPromise('coffees', 'put', coffee);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('coffees', 'get').then((indexedCoffees) => {
        dispatch({
          type: UPDATE_COFFEES,
          coffees: indexedCoffees,
        });
      });
    }
  }, [coffees, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        coffee: { ...currentCoffee, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentCoffee, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentCoffee._id,
    });

    idbPromise('cart', 'delete', { ...currentCoffee });
  };

  return (
    <>
      {currentCoffee && cart ? (
    <div className='box-has-background-color-black has-text-centered'>
    <NavLink to='/Shop'>← Back to Coffees</NavLink>

          <h2>{currentCoffee.name}</h2>

          <p>{currentCoffee.description}</p>

          <p>
            <strong>Price:</strong>${currentCoffee.price} <button onClick={addToCart}>Add to Cart</button>
            <button disabled={!cart.find((p) => p._id === currentCoffee._id)} onClick={removeFromCart}>
              Remove from Cart
            </button>
          </p>

          <img src={`/images/${currentCoffee.image}`} alt={currentCoffee.name} />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt='loading' /> : null}
      <Cart />
    </>
  );
}

export default Detail;
