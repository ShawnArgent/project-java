
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECIPES } from '../util/queries';

function RecipeList() {
  const { loading, data } = useQuery(QUERY_RECIPES);

  const recipes = data?.recipes || [];

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        recipes.map((recipe) => (
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img alt={recipe.title} src={recipe.image} />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{recipe.title}</p>
                  <p className="subtitle is-6">{recipe.ingredients}</p>
                </div>
              </div>

              <div className="content">{recipe.description}</div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}

export default RecipeList;
