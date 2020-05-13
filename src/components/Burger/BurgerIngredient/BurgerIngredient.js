import React, { Component } from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

/**
* @author
* @function BurgerIngredient
**/

const BurgerIngredient = props => {
    let ingredient = null;
    switch (props.type) {
        case ('bread-top'):
            ingredient = <p className={classes.BreadTop}></p>
            break;
        case ('bread-bottom'):
            ingredient = <p className={classes.BreadBottom}></p>
            break;

        case ('meat'):
            ingredient = <p className={classes.Meat}></p>
            break;
        case ('cheese'):
            ingredient = <p className={classes.Cheese}></p>
            break;
        case ('salad'):
            ingredient = <p className={classes.Salad}></p>
            break;
        case ('bacon'):
            ingredient = <p className={classes.Bacon}></p>
            break;
        default:
            ingredient = null;
    }
    return ingredient;



}
BurgerIngredient.proTypes = {
    type: PropTypes.string.isRequired
}
export default BurgerIngredient;