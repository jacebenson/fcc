import React, { Component } from 'react';

import Ingredient from './Ingredient.js';

const Recipe = ({recipe, onRecipeSelect}) => {
  const ingredients = recipe.ingredients.map((ingredient) => {
    return <Ingredient key={ingredient} ingredient={ingredient} /> 
  });
  return (
    <tr onClick={() => onRecipeSelect(recipe.name)}>
      <th scope="row">{recipe.name}</th>
      <td>
        <div>{recipe.summary}</div>
      </td>
      <td>{ingredients}</td>
    </tr>
  );
}

export default Recipe;
