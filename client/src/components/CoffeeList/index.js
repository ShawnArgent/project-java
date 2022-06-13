import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_COFFEE } from '../../util/queries';

function CoffeeList() {
  const { loading, data } = useQuery(QUERY_COFFEE);

  const coffees = data?.coffees || [];

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        coffees.map((coffee) => (
          <div className='box'>
            Our Coffees
            <div className='column is-2 is-offset-5' key={coffee.name}>
              <div className='card-image'>
                <figure className='image is-4by3'>
                  <img alt={coffee.name} src={`/images/${coffee.image}`} />
                </figure>
              </div>
              <div className='card-content'>
                <div className='media'>
                  <div className='media-content'>
                    <p className='title is-4 has-text-centered has-text-white'>{coffee.name}</p>
                    <p className='subtitle is-6 has-text-centered has-text-white'>Roast: {coffee.roast}</p>
                    <p className='subtitle is-6 has-text-centered has-text-white'>Price: {coffee.price}</p>
                    <p className='subtitle is-6 has-text-centered has-text-white'>Type: {coffee.type}</p>
                    <NavLink to={`/coffee/${coffee._id}`} className='button'>
                      Learn More
                    </NavLink>
                  </div>
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
