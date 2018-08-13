import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
           <div>menu</div>
           <Logo />
           <nav>
               ...
           </nav>        
        </header>
       );
};

export default toolbar;