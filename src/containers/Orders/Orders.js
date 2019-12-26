import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { getOrders } from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onGetOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    const style = {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "600",
      padding: "22px",
      color: "white",
      textShadow: "2px 2px 5px black"
    };
    if (this.props.orders.length) {
      orders = this.props.orders.map(ord => {
        return (
          <Order
            key={ord.id}
            price={Number.parseFloat(ord.price).toFixed(2)}
            ingredients={ord.ingredients}
          />
        );
      });
    } else {
      orders = <div style={style}>No any orders.</div>;
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders: (token, userId) => dispatch(getOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
