import React from 'react';
import styles from './Order.module.css';

const Order = (props) => {

    let ingredients = [];

    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            amount: props.ingredients[ingName],
        });
    }

    let output = ingredients.map(ing => <span key={ing.name} style={{
        textTransform: 'capitalize',
        border: '1px solid #eee',
        margin: '0 5px',
        padding: '2px'
    }}> {ing.name} ({ing.amount}) </span>)

    return (
        <div className={styles.Order}>
            <p>Ingredients: {output}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default Order;