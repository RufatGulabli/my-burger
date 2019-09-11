import React, { Fragment, Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        sideDrawerToggle: false
    }

    closeSideDrawer = () => {
        this.setState({ sideDrawerToggle: false });
    }

    openSideDrawer = () => {
        this.setState(prevState => {
            return { sideDrawerToggle: !prevState.sideDrawerToggle }
        });
    }

    render() {
        return (
            <Fragment>
                <Toolbar open={this.openSideDrawer} />
                <SideDrawer open={this.state.sideDrawerToggle} toggleSideDrawer={this.closeSideDrawer} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;