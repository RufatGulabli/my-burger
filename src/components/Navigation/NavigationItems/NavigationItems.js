import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem clicked={props.clicked} link="/" exact>Burger Builder</NavigationItem>
            {props.isAuthenticated && <NavigationItem clicked={props.clicked} link="/orders">Orders</NavigationItem>}
            {
                props.isAuthenticated ?
                    <NavigationItem clicked={props.clicked} link="/logout">Logout</NavigationItem>
                    : <NavigationItem clicked={props.clicked} link="/login">Login</NavigationItem>
            }
        </ul>
    );
}

export default NavigationItems;