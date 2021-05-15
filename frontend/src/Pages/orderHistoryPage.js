import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { myOrderList } from '../actions/orderActions';
import Header from '../components/Header';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryPage(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin')
    }

    const myListOrder = useSelector(state => state.myListOrder)
    const { loading, error, orders } = myListOrder;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(myOrderList());
    }, [dispatch])


    return (
        <>
            <Header />
            <div>
                <h1>Order History</h1>
                {loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="danger"> {error} </MessageBox> :
                        (
                            <div className="table-responsive-md p-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="pl-5">ID</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th className="pl-5">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td className="pl-5">{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                                <td>
                                                    {order.isDelivered
                                                        ? order.deliveredAt.substring(0, 10)
                                                        : 'No'}
                                                </td>
                                                <td>{order.totalPrice.toFixed(2)}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="small btn btn-dark btn-block checkout-button"
                                                        onClick={() => {
                                                            props.history.push(`/order/${order._id}`);
                                                        }}
                                                    >
                                                        Details
                                            </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                }
            </div>
        </>
    )
}
