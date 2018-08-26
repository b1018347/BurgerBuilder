import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 4,
        purchaseable: false,
        purchaseMode: false,
        loading: false
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map( igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            } , 0);
        this.setState({purchaseable: sum > 0});    
    }

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0) {
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = (oldCount - 1);
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({totalPrice: newPrice, ingredients : updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({purchaseMode: true});
    }

    purchaseCanceledHandler = () => {
        this.setState({purchaseMode: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'Test street',
                    zip: '42342',
                    country: 'Germany'
                },
                email: 'test@test.com'
            }
        };
        axios.post('orders.json', order)
            .then(response => {
                this.setState({loading: false, purchaseMode: false});
                console.log(response);
            })
            .catch(error => {
                this.setState({loading: false, purchaseMode: false});
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = (
            <OrderSummary
                purchaseCancelled={this.purchaseCanceledHandler}
                purchaseContinued={this.purchaseContinueHandler} 
                price={this.state.totalPrice}
                ingredients={this.state.ingredients} />
        );

        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchaseMode} modalClosed={this.purchaseCanceledHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    disabled={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                 />
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);