import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';
import AdminHeader from '../components/AdminHeader';
import AdminSide from '../components/AdminSide';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstans';

export default function OrderListPage(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin')
    }

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders());
    }, [dispatch, successDelete]);

    const createHandler = () => {

    };

    // if (successDelete) {
    //     dispatch({ type: PRODUCT_DELETE_RESET });
    // }
    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
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
                                    <h1>Order List</h1>
                                    <div className="button">
                                        {/* <!-- Button trigger modal --> */}
                                        <button type="button" className="btn btn-dark btn-block checkout-button mt-5 " onClick={createHandler}>
                                            Post an Order
                                        </button>
                                    </div>
                                </div>
                                {loadingDelete && <LoadingBox></LoadingBox>}
                                {errorDelete && <MessageBox variant="danger"> {errorDelete} </MessageBox>}
                                {
                                    loading ? <LoadingBox></LoadingBox> :
                                        error ? <MessageBox variant="danger"> {error} </MessageBox>
                                            :
                                            // (
                                            <>
                                                <table className="table  table-container font">
                                                    <thead className="bg-dark text-white">
                                                        <tr>
                                                            <th className="border-left border-light p-4">Order</th>
                                                            <th className="border-left border-light p-4">Date</th>
                                                            <th className="border-left border-light p-4">Status</th>
                                                            <th className="border-left border-light p-4">Customer</th>
                                                            <th className="border-left border-light p-4">Purchased</th>
                                                            <th className="border-left border-light p-4">Total</th>
                                                            <th className="border-left border-light p-4">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orders.map((order) => (
                                                            <tr key={order._id}>
                                                                <td className="p-4 font-weight-bold">{order._id} </td>
                                                                <td className="border-left border-light p-4 text-secondary">{order.createdAt.substring(0, 10)}</td>
                                                                <td className="border-left border-light font-weight-bold p-4">{order.isDelivered
                                                                    ? order.deliveredAt.substring(0, 10)
                                                                    : 'On Hold'}</td>
                                                                <td className="border-left border-light p-4 text-secondary">{order.user.name} </td>
                                                                <td className="border-left border-light p-4 text-secondary">{order.orderItems[0].qty > 1 ? order.orderItems[0].qty : order.orderItems[0].name}</td>
                                                                <td className="border-left border-light p-4 text-secondary">{order.totalPrice.toFixed(2)}</td>
                                                                <td className="border-left border-light p-4">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-info small mr-3"
                                                                        onClick={() =>
                                                                            props.history.push(`/order/${order._id}`)
                                                                        }
                                                                    >
                                                                        <i className="fa fa-pencil" aria-hidden="true"> </i>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-danger small"
                                                                        onClick={() => deleteHandler(order)}
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
