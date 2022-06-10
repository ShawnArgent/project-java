import React from "react";
import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../util/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../util/actions";
import { idbPromise } from "../../util/helpers";

function CoffeeItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    roast,
    quantity,
    price,
    tastingProfile,
    location,
    locationHistory,
    _id,
  } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <Link to={`/coffee/${_id}`}>
            <img alt={name} src={`/images/${image}`} />
          </Link>
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{name}</p>
            <p class="subtitle is-6">{roast}</p>
          </div>
        </div>

        <div class="content">
          <ul>
            <li>{location}</li>
            <li>{tastingProfile}</li>
            <li>{locationHistory}</li>
            <li>{price}</li>
            <li>{quantity}</li>
          </ul>
          <button onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeItem;
