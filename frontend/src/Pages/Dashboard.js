import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, listUsers, register } from '../actions/userActions';
import AdminHeader from '../components/AdminHeader';
import AdminSide from '../components/AdminSide';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import socketIOClient from 'socket.io-client';

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
    window.location.host.indexOf('localhost') >= 0
        ? 'http://127.0.0.1:5000'
        : window.location.host;

export default function Dashboard(props) {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

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
        //     props.history.push(`/register`)
        // }
        dispatch(listUsers())
        dispatch({
            type: USER_DETAILS_RESET,
        });

        if (!socket) {
            const sk = socketIOClient(ENDPOINT);
            setSocket(sk);
            sk.emit('onLogin', {
                _id: userInfo._id,
                name: userInfo.name,
            });
            sk.on('listUsers', (updatedUsers) => {
                allUsers = updatedUsers;
                setOnlineUsers(allUsers);
            });
        }
    }, [dispatch, props.history]);

    const createHandler = () => {
        dispatch(register())
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

                        <div class="container layer">
                            <h2 class="mt-3">DashBoard</h2>


                            <div class="d-flex mb-5">
                                <div class="card1 ">
                                    <div class="d-flex justify-content-between mt-1 mb-1">
                                        <h5 class="text-white">Total Sales</h5>
                                        <button>View Report</button>
                                    </div>

                                    <h3 class="text-white  mb-3">$74,958.49</h3>

                                    <p class="text-white mb-4">$7,395.37 in last month</p>

                                    <small class="text-white">This week so far</small>

                                    <div class="d-flex justify-content-between mt-1 mb-1">
                                        <h3 class="text-white mt-2">$1,338.72</h3>
                                        <div>
                                            <small class="d-flex flex-column text-success">4.63% <span class="text-white">vs. last week</span></small>
                                        </div>
                                    </div>
                                </div>
                                <div class="card1 cards text-dark bg-white">
                                    <div class="d-flex justify-content-between mt-2 mb-1 ">
                                        <h5 class="">Averarge order</h5>
                                        <button class=" bg-white text-secondary">...</button>
                                    </div>

                                    <div class="d-flex justify-content-between mt-2 mb-2">
                                        <h3 class=" mt-2">$463.35</h3>
                                        <div>
                                            <small class="d-flex flex-column text-success">4.63% <span class="text-secondary">vs. last week</span></small>
                                        </div>
                                    </div>

                                    <p class="mt-5">Orders over time</p>

                                </div>
                            </div>


                            <div class="d-flex">
                                <div class="card2 ">
                                    <div class="d-flex justify-content-between mt-2 mb-1">
                                        <h5 class="">Orders</h5>
                                    </div>

                                    <div class="d-flex justify-content-between mt-2 mb-2">
                                        <h3 class=" mt-2">329</h3>
                                        <div>
                                            <small class="d-flex flex-column text-success">4.63% <span class="text-secondary">vs. last week</span></small>
                                        </div>
                                    </div>
                                </div>
                                <div class="card2 cards text-dark ">
                                    <div class="d-flex justify-content-between mt-2 mb-1">
                                        <h5 class="">Customers</h5>
                                    </div>

                                    <div class="d-flex justify-content-between mt-2 mb-2">
                                        <h3 class=" mt-2">194</h3>
                                        <div>
                                            <small class="d-flex flex-column text-success">4.63% <span class="text-secondary">vs. last week</span></small>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="mt-5 bg-white rounded table">
                                <h6 class="pl-3 text-dark mt-5 ">Recent Orders</h6>
                                <table class="table table-hover bg-white">
                                    <thead>
                                        <tr>
                                            <th scope="col"><small class="text-secondary">Order No.</small></th>
                                            <th scope="col"><small class="text-secondary">Customer</small></th>
                                            <th scope="col"><small class="text-secondary">Date</small></th>
                                            <th scope="col"><small class="text-secondary">Amount</small></th>
                                            <th scope="col"><small class="text-secondary">Status</small></th>
                                        </tr>
                                    </thead>
                                    <tbody class="tbody">
                                        <tr>
                                            <th scope="row"><small class="purple">#95954</small></th>
                                            <td><span class="purple span">AB</span><small>Abu Bin Ishtiyak</small></td>
                                            <td><small class="text-secondary">02/11/2020</small></td>
                                            <td><small class="font-weight-bold pr-1">4,596.75</small><small class="font-weight-light">USD</small></td>
                                            <td class="text-success"><small>•Paid</small></td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><small class="purple">#95850</small></th>
                                            <td><span class="text-primary span">DE</span><small>Desiree Edwards</small></td>
                                            <td><small class="text-secondary">02/11/2020</small></td>
                                            <td><small class="font-weight-bold pr-1">596.75</small><small class="font-weight-light">USD</small></td>
                                            <td class="text-danger"><small>•Canceled</small></td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><small class="purple">#95812</small></th>
                                            <td><span class="purple span">BS</span><small>Blanca Schultz</small></td>
                                            <td><small class="text-secondary">01/11/2020</small></td>
                                            <td><small class="font-weight-bold pr-1">199.99</small><small class="font-weight-light">USD</small></td>
                                            <td class="text-success"><small>•Paid</small></td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><small class="purple">#95256</small></th>
                                            <td><span class="purple span">NL</span><small>Naomi Lawrence</small></td>
                                            <td><small class="text-secondary">02/29/2020</small></td>
                                            <td><small class="font-weight-bold pr-1">1099.99</small><small class="font-weight-light">USD</small></td>
                                            <td class="text-success"><small>•Paid</small></td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><small class="purple">#95135</small></th>
                                            <td><span class="text-success span">CH</span><small>Cassandra Hogan</small></td>
                                            <td><small class="text-secondary">02/11/2020</small></td>
                                            <td><small class="font-weight-bold pr-1">1099.99</small><small class="font-weight-light">USD</small></td>
                                            <td class="text-success"><small>•Paid</small></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <div class="d-flex mt-5">
                                <div class="card1 text-dark bg-white">
                                    <div class="d-flex justify-content-between mt-2 mb-1 ">
                                        <h6 class="">Top Products</h6>
                                        <small>
                                            <select name="cars" class="text-secondary bg-white border-0">
                                                <option value="volvo">Daily</option>
                                                <option value="saab" selected>Weekly</option>
                                                <option value="mercedes">Monthly</option>
                                            </select>
                                        </small>
                                    </div>

                                    <div class="d-flex justify-content-between mt-1 card3">
                                        <div class="d-flex">
                                            <img src="/img/watch1.png" alt="watch1" />
                                            <p class=" mt-2 d-flex flex-column">Pink Fitness Tracke <small class="text-secondary">$99.00</small></p>
                                        </div>
                                        <p class="d-flex flex-column shift-left">$990.00 <small class="text-secondary">10 Sold</small></p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-1 card3">
                                        <div class="d-flex">
                                            <img src="/img/watch2.png" alt="watch1" />
                                            <p class=" mt-2 d-flex flex-column">Pink Fitness Tracke <small class="text-secondary">$99.00</small></p>
                                        </div>
                                        <p class="d-flex flex-column shift-left">$990.00 <small class="text-secondary">10 Sold</small></p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-1 card3">
                                        <div class="d-flex">
                                            <img src="/img/watch3.png" alt="watch1" />
                                            <p class=" mt-2 d-flex flex-column">Pink Fitness Tracke <small class="text-secondary">$99.00</small></p>
                                        </div>
                                        <p class="d-flex flex-column shift-left">$990.00 <small class="text-secondary">10 Sold</small></p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-1 card3">
                                        <div class="d-flex">
                                            <img src="/img/watch4.png" alt="watch1" />
                                            <p class=" mt-2 d-flex flex-column">Pink Fitness Tracke <small class="text-secondary">$99.00</small></p>
                                        </div>
                                        <p class="d-flex flex-column shift-left">$990.00 <small class="text-secondary">10 Sold</small></p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-1 card3">
                                        <div class="d-flex">
                                            <img src="/img/watch5.png" alt="watch1" />
                                            <p class=" mt-2 d-flex flex-column">Pink Fitness Tracke <small class="text-secondary">$99.00</small></p>
                                        </div>
                                        <p class="d-flex flex-column shift-left">$990.00 <small class="text-secondary">10 Sold</small></p>
                                    </div>
                                </div>


                                <div class="card1 cards text-dark bg-white">
                                    <div class="d-flex justify-content-between mt-2 mb-1">
                                        <h6 class="">Store Statistics</h6>
                                    </div>

                                    <div class="d-flex justify-content-between mt-1 card3">
                                        <div class="d-flex">
                                            <small class=" mt-2 d-flex flex-column text-secondary">Orders <h5 class="text-dark">1,795</h5></small>
                                        </div>
                                        <p class="d-flex flex-column">$990.00 <small class="text-secondary">10 Sold</small></p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-1 card3">
                                        <div class="d-flex">
                                            <small class=" mt-2 d-flex flex-column text-secondary">Customers <h5 class="text-dark">2,327</h5></small>
                                        </div>
                                        <p class="d-flex flex-column">$990.00 <small class="text-secondary">10 Sold</small></p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-1 card3">
                                        <div class="d-flex">
                                            <small class=" mt-2 d-flex flex-column text-secondary">Products<h5 class="text-dark">674</h5></small>
                                        </div>
                                        <p class="d-flex flex-column">$990.00 <small class="text-secondary">10 Sold</small></p>
                                    </div>
                                    <div class="d-flex justify-content-between mt-1 card3">
                                        <div class="d-flex">
                                            <small class=" mt-2 d-flex flex-column text-secondary">Category<h5 class="text-dark">68</h5></small>
                                        </div>
                                        <p class="d-flex flex-column">$990.00 <small class="text-secondary">10 Sold</small></p>
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
