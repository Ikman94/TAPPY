import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    // console.log(error)
    // console.log(userInfo)
    // console.log(userSignin)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        dispatch(signin(email, password));
        e.preventDefault();
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])
    return (
        <div className="form1">
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <p className="display-3 text-center">TAPPY</p>
                </div>
                <div>
                    <h2 className=" text-center">Sign in to your Tappy account</h2>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger"> {error} </MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email" placeholder="Email address (required)"
                        required
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password" placeholder="Password (required)"
                        required
                        onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label />
                    <button className="btn btn-dark checkout-button mt-5" type="submit">Sign In</button>
                </div>
            </form>
        </div>
    )
}