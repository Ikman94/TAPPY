import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';
import Header from '../components/Header';

export default function ShippingAddressPage(props) {
    const userSignin = useSelector(state =>state.userSignin);
    const {userInfo} = userSignin;
    if(!userInfo){
        props.history.push('/signin')
    }

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart;

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment')
    }
    return (
        <>
            <Header/>
            <div className="form1">
                <CheckOutSteps step1 step2></CheckOutSteps>
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <h1>Shipping Address</h1>
                    </div>
                    <div>
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter Full Name (required)"
                            value={fullName}
                            onChange={e => setFullName((e).target.value)}
                            required>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="address">Street Address</label>
                        <input
                            type="text"
                            placeholder="Address (required)"
                            value={address}
                            onChange={e => setAddress((e).target.value)}
                            required>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            placeholder="City (required)"
                            value={city}
                            onChange={e => setCity((e).target.value)}
                            required>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            type="text"
                            placeholder="Postal Code (required)"
                            value={postalCode}
                            onChange={e => setpostalCode((e).target.value)}
                            required>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            placeholder="Country (required)"
                            value={country}
                            onChange={e => setCountry((e).target.value)}
                            required>
                        </input>
                    </div>
                    <div>
                        <label />
                        <button
                            type="submit"
                            className="btn btn-dark btn-block checkout-button mt-5">
                            Continue to Payment
                    </button>
                    </div>
                </form>
            </div>
        </>
    )
}