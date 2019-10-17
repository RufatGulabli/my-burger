import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
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
                <Toolbar open={this.openSideDrawer} isAuth={this.props.isLoggedIn} />
                <SideDrawer isAuth={this.props.isLoggedIn} clicked={this.closeSideDrawer} open={this.state.sideDrawerToggle} toggleSideDrawer={this.closeSideDrawer} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);