import React, { useEffect } from 'react';
import Product from "../components/product";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';
import Header from '../components/Header';

export default function Donuts(props) {
    const dispatch = useDispatch()
    
    const productList = useSelector(state => state.productList)
    const { loading, error, products } =productList

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin')
    }

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);

    return (
        <div>
            <Header/>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger"> {error} </MessageBox>
            ) : (
                <div className="pageheaders">
                    <div className="menu-header">
                        <p className="display-3 font-weight-bold">OUR MENU</p>
                        <p className="font-weight-bold">DOUGHNUTS</p>
                    </div>
                    <div className="ow center">
                        {
                            products.map(product => {
                                if (product.category === 'Donuts'){
                                    return(
                                        <>
                                            <Product product={product} />
                                         </>   
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            )}

        </div>
    )
}