import React from 'react';
import classes from './Order.module.css';

/**
* @author
* @function Order
**/

const Order = (props) => {

    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(key => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            padding: '5px',
            border: '1px solid #ccc'
        }}
            key={key.name}> {key.name} ({key.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{+props.price.toFixed(2)}</strong></p>
        </div>
    )

}

export default Order
