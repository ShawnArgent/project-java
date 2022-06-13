import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_COFFEE } from "../../util/queries";
import { idbPromise } from "../../util/helpers";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../util/actions";
import { useStoreContext } from "../../util/GlobalState";

function CoffeeList(item) {
  const { loading, data } = useQuery(QUERY_COFFEE);
  const [state, dispatch] = useStoreContext();

  const coffees = data?.coffees || [];

  const { _id } = item;

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
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        coffees.map((coffee) => (
          <div className="card" key={coffee._id}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img alt={coffee.name} src={`/images/${coffee.image}`} />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{coffee.name}</p>
                  <p className="subtitle is-6">Roast: {coffee.roast}</p>
                  <p className="subtitle is-6">Price: {coffee.price}</p>
                  <p className="subtitle is-6">
                    Tasting Profile: {coffee.tastingProfile}
                  </p>
                  <p className="subtitle is-6">Location: {coffee.location}</p>
                  <p className="subtitle is-6">
                    Location History: {coffee.locationHistory}
                  </p>

                  <p className="subtitle is-6">Type: {coffee.type}</p>
                  <button onClick={addToCart} className="button">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}

export default CoffeeList;
