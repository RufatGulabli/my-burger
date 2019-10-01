import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import style from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className={style.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" click={props.onCancel}>Cancel</Button>
            <Button btnType="Success" click={props.onContinued}>Continue</Button>
        </div>
    );
}

export default CheckoutSummary;