import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckOutSteps from '../components/CheckOutSteps'
import Header from '../components/Header';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstans';

export default function PlaceOrderPage(props) {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment')
    };

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin')
    };

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
    }

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({
                type: ORDER_CREATE_RESET
            })
        }

    }, [dispatch, order, success, props.history])
    return (
       <>
       <Header/>
            <div>
                <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
                <div className="ow top ">
                    <div className="coll-2 order-page grey">
                        <ul className="list-group list-group-flush ">
                            <li className="list-group-item">
                                <div className="card p-3">
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                        <strong>Address:</strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalcode},
                                    {cart.shippingAddress.country}
                                    </p>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="card p-3">
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Payment Method :</strong> {cart.paymentMethod}
                                    </p>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="card">

                                    <ul className="list-group list-group-flush">
                                        <h2 className="pl-3">Order Items</h2>
                                        {
                                            cart.cartItems.map((item) => (
                                                <li key={item.product} className="list-group-item grey">
                                                    <div className="ow top1">
                                                        <div>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="small smaller">
                                                            </img>
                                                        </div>
                                                        <div className="min-30">
                                                            <Link to={`/product/${item.product}`}>
                                                                <p className="">{item.name}</p>
                                                            </Link>
                                                        </div>
                                                        <div>

                                                            <p className="">
                                                                Qty:{item.qty} <strong className="pl-4">₦{item.price * item.qty}</strong>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </li>
                                            ))
                                        }
                                        <li className="list-group-item grey"></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="coll-1 order-page">
                        <div className="card">
                            <ul className="list-group list-group-flush order-page">
                                <li className="ow list-group-item grey">
                                    <h2>Order Summary</h2>
                                </li>
                                <li className="ow list-group-item grey">
                                    <div>Items({cart.cartItems.length})</div>
                                    <div>₦{cart.itemsPrice.toFixed(2)}</div>
                                </li>
                                <li className="ow list-group-item grey">
                                    <div>Shipping</div>
                                    <div>₦{cart.shippingPrice.toFixed(2)}</div>
                                </li>
                                <li className="ow list-group-item grey">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>₦{cart.totalPrice.toFixed(2)}</strong></div>
                                </li>
                                <li className="ow list-group-item grey">
                                    <label />
                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-block checkout-button mt-5"
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrderHandler}>
                                        Place Order
                                </button>
                                </li>

                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}

                            </ul>

                        </div>
                    </div>
                </div>
            </div>
       </>
    )
}
