import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Header from '../components/Header';
import MessageBox from '../components/MessageBox';

export default function CartPage(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin')
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
    };
    const checkOutHandler = () => {
        props.history.push('/shipping')
    }
    return (
       <>
            <Header/>
            <div className="ow top">
                <div className="coll-2 border-right">
                    <h1>Your Cart: {cartItems.reduce((a, c) => a + c.qty, 0)} items</h1>
                    {cartItems.length === 0 ? <MessageBox>
                        Cart is Empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                        :
                        (
                            <ul className="list-group list-group-flush">
                                {
                                    cartItems.map((item) => (
                                        <li key={item.product} className="list-group-item">
                                            <div className="ow top top1">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small">
                                                    </img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>
                                                        <p className="">{item.name}</p>
                                                    </Link>
                                                </div>
                                                <div className="pt-2">
                                                    <p>Qty:
                                                    <select
                                                            value={item.qty}
                                                            onChange={(e) =>
                                                                dispatch(
                                                                    addToCart(item.product, Number(e.target.value))
                                                                )
                                                            }
                                                        >
                                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="font-weight-bold pt-2">₦{item.price}</p>
                                                </div>

                                            </div>
                                            <div className="cart-button">
                                                <button
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                    className=" border-bottom bg-white"
                                                >
                                                    Remove
                                            </button>
                                            </div>
                                        </li>
                                    ))
                                }
                                <li className="list-group-item"></li>
                            </ul>
                        )
                    }
                </div>

                <div className="coll-1">
                    <div class="card border-0">

                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">

                                <p>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                                <span className="checkout-price">
                                        ₦{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                    </span>
                                </p>

                                <p>Delivery</p>
                            </li>

                            <li class="list-group-item">
                                <p>Est ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                            <span className="checkout-price">
                                        ₦{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                    </span>
                                </p>

                                <button
                                    type="button"
                                    onClick={checkOutHandler}
                                    className="btn btn-dark btn-block checkout-button mt-5"
                                    disabled={cartItems.length === 0}>
                                    Check Out
                        </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
       </>
    )
}