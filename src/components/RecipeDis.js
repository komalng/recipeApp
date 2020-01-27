import React from 'react';
import style from './Recipe.module.css';


export default function RecipeDis(props) {
  const { title, calories, image, ingredients } = props;
  return (
    <div className={style.recipe}>
      <h1  >{title}</h1>
      <ol>
        {ingredients.map(ingredient => (
          <li>{ingredient.text}</li>
        ))};
      </ol>
      <p><strong>Calories:-</strong> {calories}</p>
      <img src={image} alt='' className={style.image} />

    </div>
  )
}