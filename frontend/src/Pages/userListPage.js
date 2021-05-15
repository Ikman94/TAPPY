import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, listUsers, register } from '../actions/userActions';
import AdminHeader from '../components/AdminHeader';
import AdminSide from '../components/AdminSide';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET, USER_REGISTER_RESET } from '../constants/userConstants';
import socketIOClient from 'socket.io-client';

export default function UserListPage(props) {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    // const userRegister = useSelector(state => state.userRegister);
    // const {
    //     loading: createLoading,
    //     error: createError,
    //     success: createSuccess
    // } = userRegister;

    const userDelete = useSelector((state) => state.userDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = userDelete;

    useEffect(() => {
        // if (createSuccess) {
        //     dispatch({type: USER_REGISTER_RESET})
        //     props.history.push(`/register`)
        // }
        dispatch(listUsers())
        dispatch({
            type: USER_DETAILS_RESET,
        });
    }, [dispatch, props.history]);

    const createHandler = () => {
        props.history.push(`/register`)
    }

    const deleteHandler = (user) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(user._id));
        }
    };

    return (
        <>
            <div class="row no-gutter">
                <div class="navigation col-2 pt-4  border-light">
                    <AdminSide />
                </div>
                <div class="col-10">
                    {/* <AdminHeader/> */}
                    <AdminHeader />
                    <div class="body">

                        <div>
                            <div className="bg-color">
                                <div className="ow products-header">
                                    <p className="display-4 font-weight-bold">Customers</p>
                                    <div className="button">
                                        {/* <!-- Button trigger modal --> */}
                                        <button type="button" className="btn btn-dark btn-block checkout-button mt-5 " onClick={createHandler}>
                                            +Add
                                        </button>
                                    </div>
                                </div>
                                {/* {createLoading && <LoadingBox></LoadingBox>}
                                {createError && <MessageBox variant="danger"> {createError} </MessageBox>} */}
                                {loadingDelete && <LoadingBox></LoadingBox>}
                                {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                                {successDelete && (
                                    <MessageBox variant="success">User Deleted Successfully</MessageBox>
                                )}
                                {/* {createError && <MessageBox variant="danger"> {createError} </MessageBox>} */}

                                {
                                    loading ? <LoadingBox></LoadingBox> :
                                        error ? <MessageBox variant="danger"> {error} </MessageBox>
                                            :
                                            // (
                                            <>
                                                <table className="table  table-container font">
                                                    <thead className="bg-dark text-white">
                                                        <tr>
                                                            <th className="border-left border-light p-4">User</th>
                                                            <th className="border-left border-light p-4">Ordered</th>
                                                            <th className="border-left border-light p-4">Phone</th>
                                                            <th className="border-left border-light p-4">Country</th>
                                                            <th className="border-left border-light p-4">Last Order</th>
                                                            <th className="border-left border-light p-4">Status</th>
                                                            <th className="border-left border-light p-4">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users.map((user) => (
                                                            <tr key={user._id}>
                                                                <td className="p-4 font-weight-bold"> <img src={user.image} alt={user.name} className="small smaller pr-3" />{user.name} <span> {user.email}</span> </td>
                                                                <td className="border-left border-light p-4 text-secondary">{console.log(user.order)}</td>
                                                                <td className="border-left border-light font-weight-bold p-4">{user.phone}</td>
                                                                <td className="border-left border-light p-4 text-secondary"> {user.country}</td>
                                                                <td className="border-left border-light p-4 text-secondary">{user.category}</td>
                                                                <td className="border-left border-light p-4 text-secondary">
                                                                   
                                                                </td>
                                                                <td className="border-left border-light p-4">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-info small mr-3"
                                                                        onClick={() =>
                                                                            props.history.push(`/user/${user._id}/edit`)
                                                                        }
                                                                    >
                                                                        <i className="fa fa-pencil" aria-hidden="true"> </i>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-danger small"
                                                                        onClick={() => deleteHandler(user)}
                                                                    >
                                                                        <i className="fa fa-trash" aria-hidden="true"> </i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </>
                                    // )
                                }
                            </div>
                            <div class="card">
                                <div class="card-body d-flex justify-content-between">
                                    <small class="text-secondary pt-3">© 2020 Tap. Template by Softnio</small>
                                    <div class="d-flex">
                                        <Link to="#" class="list-group-item list-group-item-action border-0"><small>Terms</small></Link>
                                        <Link to="#" class="list-group-item list-group-item-action border-0"><small>Privacy</small></Link>
                                        <Link to="#" class="list-group-item list-group-item-action border-0"><small>Help</small></Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
