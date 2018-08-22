import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }
    sideDrawerClosedHander = () => {
        this.setState({showSideDrawer : false});
    }
    sideDrawerToggledHander = () => {
        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer };
        });
    }
    
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggledHander} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHander} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>    
        );
    }
}

export default Layout;