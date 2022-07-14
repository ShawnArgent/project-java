import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECIPES } from '../util/queries';

function RecipeList() {
  const { loading, data } = useQuery(QUERY_RECIPES);

  const recipes = data?.recipes || [];

  return (
    <main>
      <h1 className='title'>Recipes</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        recipes.map((recipe) => (
     <div className='columns is-centered'>
          <div className='column'>
          <div className='card'>
          
              <div className='card-image'>
                <figure className='image is-5by5'>
                  <img alt={recipe.title} src={recipe.image} />
                </figure>
                    <p className='title is-4'>{recipe.title}</p>
                    <p className='subtitle is-6'>{recipe.ingredients.join(', ')}</p>
                <div className='content'>{recipe.description}</div>
              </div>
            </div>
            </div>
            </div>
        ))
      )}
    </main>
  );
}

export default RecipeList;
