import React, { useEffect } from "react";
import CoffeeItem from "../CoffeeItem";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { QUERY_COFFEE } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { UPDATE_COFFEE } from "../../util/actions";

function CoffeeList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_COFFEE);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_COFFEE,
        coffee: data.coffee,
      });
      data.coffee.forEach((product) => {
        idbPromise("coffee", "put", product);
      });
    } else if (!loading) {
      idbPromise("coffee", "get").then((products) => {
        dispatch({
          type: UPDATE_COFFEE,
          coffee: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterCoffee() {
    if (!currentCategory) {
      return state.coffee;
    }

    return state.coffee.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Coffees:</h2>
      {state.coffee.length ? (
        <div className="flex-row">
          {filterCoffee().map((product) => (
            <CoffeeItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default CoffeeList;
