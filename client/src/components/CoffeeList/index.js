import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_COFFEE } from "../../util/queries";

function CoffeeList() {
  const { loading, data } = useQuery(QUERY_COFFEE);

  const coffees = data?.coffees || [];

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        coffees.map((coffee) => (
          <div className="card" key={coffee.name}>
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

                  <p className="subtitle is-6">Type: {coffee.type}</p>
                  <Link to={`/coffee/${coffee._id}`} className="button">
                    Learn More
                  </Link>
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
