import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = props => {
    const controls = [
        {label: 'Salad', type : 'salad'}, 
        {label: 'Bacon', type : 'bacon'}, 
        {label: 'Cheese', type : 'cheese'}, 
        {label: 'Meat', type : 'meat'}, 
    ]
    return (
        <div className={classes.BuildControls}>
        <p><b>Current price: {props.price.toFixed(2)}</b></p>
        {controls.map(ctrl => <BuildControl 
                                key={ctrl.label}
                                label={ctrl.label}
                                type={ctrl.type}
                                added={() => props.ingredientAdded(ctrl.type) }
                                removed={() => props.ingredientRemoved(ctrl.type)}
                                disabled={props.disabled[ctrl.type]}/>
                            )
                                }
            <button disabled={!props.purchaseable} 
                    className={classes.OrderButton}
                    onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;