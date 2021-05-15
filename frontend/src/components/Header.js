import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signout } from '../actions/userActions';

export default function Header() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signOutHandler = () => {
        dispatch(signout());
    }
    return (
        <div>
            <header className="ow navbar sticky-top">
                <div>
                    <Link className="brand" to="/">
                        <p className="display-3">TAPPY</p>
                    </Link>
                </div>
                <div className="header-links">
                    <Link to="/">HOME</Link>
                    <Link to="/donuts">DOUGHNUTS</Link>
                    <Link to="/icecream">ICE CREAM</Link>
                    <Link to="/cookies">COOKIES</Link>
                    <Link to="/cart">CART
            {cartItems.length > 0 && (
                            <span className="badge"> {cartItems.length} </span>
                        )}
                    </Link>
                    {
                        userInfo ? (
                            <div className="dropdown">
                                <Link to="#"> {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                </Link>
                                <ul className="dropdown-content list-group">
                                    <li className="">
                                        <Link to="/profile">User Profile</Link>
                                    </li>
                                    <li className="">
                                        <Link to="/orderhistory">Order History</Link>
                                    </li>
                                    <li className="">
                                        <Link to="#signOut" onClick={signOutHandler}>
                                            Sign Out
                    </Link>
                                    </li>
                                </ul>
                            </div>
                        ) :
                            (
                                <Link to="/signin">Sign In</Link>
                            )
                    }

                </div>
            </header>
        </div>
    )
}
