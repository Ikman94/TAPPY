import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'
import Header from '../components/Header';

export default function PaymentPage(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address){
        props.history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder')
    }
    return (
        <>
        <Header/>
            <div>
                <CheckOutSteps step1 step2 step3></CheckOutSteps>
                <form className="form form1" onSubmit={submitHandler}>
                    <div>
                        <p className="display-4 font-weight-bold">Choose a payment method</p>
                        <p className="lead">You will not be charged until you review this order on the next page.</p>
                    </div>

                    <div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div>
                                    <input
                                        type="radio"
                                        id="paypal"
                                        value="Paypal"
                                        name="paymentMethod"
                                        required
                                        checked
                                        onChange={(e) => setPaymentMethod(e.target.value)}>
                                    </input>
                                    <label htmlFor="paypal">Pay with Paypal</label>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div>
                                    <input
                                        type="radio"
                                        id="card"
                                        value="Card"
                                        name="paymentMethod"
                                        required
                                        onChange={(e) => setPaymentMethod(e.target.value)}>
                                    </input>
                                    <label htmlFor="card">Card</label>
                                </div>
                            </li>

                            <li class="list-group-item"></li>
                        </ul>
                    </div>
                    <div>
                        <button
                            className="btn btn-dark btn-block checkout-button mt-5"
                            type="submit" >
                            Continue
                    </button>
                    </div>

                </form>
            </div>
        </>
    )
}
