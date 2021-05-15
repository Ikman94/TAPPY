import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Header from '../components/Header';

export default function OrderPage(props) {
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch();
    const orderId = props.match.params.id;  //id coming from the url

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay,
         error: errorPay, 
         success: successPay
         } = orderPay;

    useEffect(() => {
        const addPayPalScript = async () => {    //Adding JavaScript Script to plugin PayPal
            const { data } = await Axios.get('/api/config/paypal')
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            };
            document.body.appendChild(script)
        };
        if (!order || successPay || (order && order._id !== orderId)) {        // If order is not loaded to the pay play take it from dispatch
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {      // order is already loaded, checked if paid 
                if (!window.paypal) {        // if not paid add the paypal script
                    addPayPalScript()
                } else {                     // if 
                    setSdkReady(true)
                }
            }
        }
    }, [dispatch, orderId, order, sdkReady, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
    )
            :
            (
                <>
                <Header/>
                    <h1 className="p-4 ">Order  {order._id} </h1>
                    <div className="ow top ">
                        <div className="coll-2 order-page grey">
                            <ul className="list-group list-group-flush ">
                                <li className="list-group-item">
                                    <div className="card p-3">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                            <strong>Address:</strong> {order.shippingAddress.address},
                                            {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                            {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ? <MessageBox variant="success">Delivered at {order.deliveredAt}
                                        </MessageBox>
                                            :
                                            <MessageBox variant="danger">Not Delivered</MessageBox>
                                        }

                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="card p-3">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Payment Method :</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? <MessageBox variant="success">Paid at {order.paidAt}
                                        </MessageBox>
                                            :
                                            <MessageBox variant="danger">Not Paid</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="card">

                                        <ul className="list-group list-group-flush">
                                            <h2 className="pl-3">Order Items</h2>
                                            {
                                                order.orderItems.map((item) => (
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
                                        <div>Items({order.orderItems.length})</div>
                                        <div>₦{order.itemsPrice.toFixed(2)}</div>
                                    </li>
                                    <li className="ow list-group-item grey">
                                        <div>Shipping</div>
                                        <div>₦{order.shippingPrice.toFixed(2)}</div>
                                    </li>
                                    <li className="ow list-group-item grey">
                                        <div><strong>Order Total</strong></div>
                                        <div><strong>₦{order.totalPrice.toFixed(2)}</strong></div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                {!sdkReady ? (<LoadingBox></LoadingBox>) :
                                                    (
                                                        <>
                                                        {errorPay && (<MessageBox variant="danger"> {errorPay} </MessageBox>)}
                                                        {loadingPay && (<LoadingBox></LoadingBox>)}
                                                        <PayPalButton
                                                            amount={order.totalPrice}
                                                            onSuccess={successPaymentHandler}>
                                                        </PayPalButton>
                                                        </>
                                                    )
                                                }
                                            </li>
                                        )
                                    }
                                </ul>

                            </div>
                        </div>
                    </div>
                </>
            )

}
