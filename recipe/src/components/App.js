import React, { Component } from 'react';
import './App.css';

import Header from './Header.js';
import RecipeList from './RecipeList.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      selectedRecipe: null
     };
  }
  componentWillMount() {
    if (localStorage.getItem('recipes') === null) {
      console.log('did not find local recipes');
      var defaultRecipes = [{
        name: 'Benson Meatballs',
        prep: '10 minutes',
        cook: '20 minutes',
        serves: '4',
        summary: 'This amazing dish of meaty meatballs served with thick delicious gravy.  Great for dinner and events.',
        ingredients: ['1 pound of beef', '2 gravy pouches', '1 quart of water'],
        instructions: 'First goto the store/nBuy some meat/nBring it home'
      },
      {
        name: 'Spicy Meatballs',
        prep: '10 minutes',
        cook: '20 minutes',
        serves: '4',
        summary: 'This amazing dish of spicy meatballs served with thick delicious gravy.  Great for dinner and events.',
        ingredients: ['1 pound of spicy sausage', '2 gravy pouches', '1 quart of water'],
        instructions: ['First goto the store','Buy some meat','Bring it home']
      }];
        localStorage.recipes =JSON.stringify(defaultRecipes);
    } else {
      console.log('did find local recipes');
      var localRecipes = JSON.parse(localStorage.getItem('recipes'));
    }
  }
  render() {
    console.log(this.state.selectedRecipe)
    if(this.state.selectedRecipe === null){
      return (
        <div className="App">
          <Header 
              onHome={() => this.setState('selectedRecipe', null)}
              />
          {this.recipes}
          <RecipeList 
            onRecipeSelect={selectedRecipe => this.setState({selectedRecipe})}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header
            selectedRecipe={this.state.selectedRecipe}
           />
          <div>{this.state.selectedRecipe}</div>
        </div>
      )
    }
  }
}

export default App;
