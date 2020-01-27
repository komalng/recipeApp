import React, { Component } from 'react';
import axios from 'axios';
import RecipeDis from './RecipeDis';
import style from './loader.module.css';


require('dotenv').config();




export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      label: 'chicken',
    }
  }



  url = (label) => {
    const REACT_APP_APP_ID = process.env.REACT_APP_APP_ID;
    const APP_KEY = process.env.REACT_APP_APP_K;
    const URL = `https://api.edamam.com/search?q=${label}&app_id=${REACT_APP_APP_ID}&app_key=${APP_KEY}`;
    return URL;

  }


  getRecipes = async () => {
    const { label } = this.state;
    const URL = this.url(label);
    const response = await axios.get(URL)
    this.setState({
      recipes: response.data.hits,
    })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  componentDidMount() {
    console.log(this.getRecipes(this.state.label));
  }

  render() {
    const { recipes } = this.state;
    if (recipes.length > 1) {
      return (
        <div className="App">
          <div className='search-form'>
            <input type='text' className='search-bar' name='label' onChange={this.onChange} />
            <button className='search-button' onClick={this.getRecipes}>Search</button>
          </div>
          <div className='recipes'>
            {this.state.recipes.map(recipe => (
              <div>
                <RecipeDis
                  title={recipe.recipe.label}
                  calories={recipe.recipe.calories}
                  image={recipe.recipe.image}
                  ingredients={recipe.recipe.ingredients} />
              </div>
            ))}
          </div>
        </div>
      )
    }
    else {
      return <div>

        <div className='search-form'>
          <input type='text' className='search-bar' name='label' onChange={this.onChange} />
          <button className='search-button' onClick={this.getRecipes}>Search</button>
        </div>
        <div>
          <h1 className={style.message}>Recipes will come Soon</h1>
        </div>
        <div className={style.loader}></div>
      </div>
    }

  }
}