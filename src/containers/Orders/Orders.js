import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actionCreator from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

    const { onFetchOrders } = props;

    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders])

    let orders = <Spinner />
    if (!props.loading) {
        orders = props.orders.map(order => (
            <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        )
        )
    }
    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.order,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionCreator.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))