import React from 'react';
import classes from './Logo.css'
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="burgerBuilder"/>
        </div>
    );
};

export default logo;