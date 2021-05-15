import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsProduct } from '../actions/productActions';
import Header from '../components/Header';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductPage(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin')
    }

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    // if(product.categrory == 'cookies'){

    // }

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    return (
        <div>
            <Header />
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger"> {error} </MessageBox>
            ) : (

                <div>
                    <Link to="/shop">
                        <p className="text-secondary pl-3">≪Back to Products</p>
                    </Link>

                    <div className="ow top">
                        <div className="coll-2">
                            <div className="productImg">
                                <img className="" src={product.image} alt={product.name}></img>
                            </div>
                        </div>
                        <div className="coll-1">
                            <div className="product-info">
                                <ul className="list-group">
                                    <li class="list-group-item bg-transparent border-0 p-0 mb-2">
                                        <h1 className="font-weight-bold"> {product.name} </h1>
                                    </li>
                                    <li class="list-group-item bg-transparent border-0 p-0 mb-2">
                                        <p> {product.description} </p>
                                    </li>
                                    <li class="list-group-item bg-transparent border-0 p-0 mb-2">
                                        {product.countInStock > 0 ? (
                                            <span className="text-success">Available</span>
                                        ) : (
                                            <span className="text-danger">Out of Stock</span>
                                        )}
                                    </li>
                                </ul>
                                {
                                    product.countInStock > 0 && (
                                        <>
                                            <div>
                                                <p className="text-weight-bold">Quantity</p>
                                                <div>
                                                    <select
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div onClick={addToCartHandler} className="add-to-cart">
                                                <button className="btn btn-dark btn-block checkout-button mt-5"> Add to cart-
                                                        <span> ₦{product.price} </span>
                                                </button>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}