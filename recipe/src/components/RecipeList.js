import React, { Component } from 'react';

import RecipeItem from './RecipeItem.js';

const RecipeList = ({onRecipeSelect}) => {
  var recipes = JSON.parse(localStorage.getItem('recipes'));
  if (recipes.length>0) {
    const recipeList = recipes.map((recipe) => {
      return <RecipeItem onRecipeSelect={onRecipeSelect} key={recipe.name} recipe={recipe} />
    });
    return (

      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Summary</th>
              <th>Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {recipeList}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>Loading...</div>
  }
}

export default RecipeList;
