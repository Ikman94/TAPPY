import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signout } from '../actions/userActions';

export default function AdminHeader() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signOutHandler = () => {
        dispatch(signout());
    }
    return (
        <div>
            <div class="d-flex justify-content-between nav-header p-3 border border-top-0 border-light bg-white">
                <div>
                    {/* <Link className="brand" to="/">
                                <p className="display-3">TAPPY</p>
                            </Link> */}
                </div>
                <div className="header-links">
                    <Link to="/support" className="text-dark"><i class="far fa-comment-alt"></i></Link>
                    <Link to="/orderlist" className="text-dark"><i class="far fa-bell"></i></Link>
                    {
                        userInfo ? (
                            <div className="dropdown">
                                <Link to="#" className="text-dark"> <small className="text-purple">Adminstrator</small> <br></br>{userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                </Link>
                                <ul className="dropdown-content list-group">
                                    <li className="">
                                        <Link to="/profile">User Profile</Link>
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
            </div>
        </div>
    )
}
