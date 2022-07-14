import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Home() {
  return (
    <section className='column is-centered'>
        <h2 className= 'has-text-centered'>Fresh Roasted Coffee From Around the World</h2>
        <h2 clasName= 'has-text-centered'>Start Your Black Coffee Journey</h2>
        <button className="button is-medium"><NavLink to='/shop'>
                SHOP
              </NavLink></button>
        
        
        </section>
  );
}
