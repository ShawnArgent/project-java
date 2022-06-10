import React, { useState, useEffect } from 'react';
import { Schema } from '../../../server/models/Recipe';

function Recipe() {
  const [recipeData, setRecipeData] = useState(null);
  const [ingredients, setIngredients] = useState(2000);

  function getRecipeData() {
    fetch(`https://api.sampleapis.com/coffee/hot;${recipes}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
      })
      .catch(() => {
        console.log('error');
      });

    return (
      <div className="Recipe">
        <section className="controls">
          <input type="number" placeholder="Ingredients (e.g. 2000)" onChange={handleChange} />
          <button onClick={getRecipeData}>Get Recipes</button>
        </section>
        {recipeData && <recipeList recipeData={recipeData} />}
      </div>
    );
  }
  function recipeList({ recipeData }) {
    return (
      <main>
        <section className="recipes">
          {recipeData.recipes.map((recipe) => {
            return <recipe key={recipe.id} recipe={recipe} />;
          })}
        </section>
      </main>
    );
  }
  function recipe({ recipe }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
      fetch(`https://api.sampleapis.com/coffee/hot;${recipe.id}`)
        .then((response) => response.json())
        .then((data) => {
          setImageUrl(data.image);
        })
        .catch(() => {
          console.log('error');
        });
    }, [recipe.id]);

    return (
      <article>
        <h1>{recipe.title}</h1>
        <img src={imageUrl} alt="recipe" />

        <a href={recipe.sourceUrl}>Go to Recipe</a>
      </article>
    );
  }
}
