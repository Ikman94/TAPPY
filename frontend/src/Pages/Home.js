import React, { useEffect } from 'react';
import HomeSlider from "../components/HomeComponents/HomeSlider";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';
import HomeSection from '../components/HomeComponents/HomeSection';
import Header from '../components/Header';
import Background from '../img/truck_hoodie.jpg'
import { Link } from 'react-router-dom';

export default function Home(props) {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin')
    }

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);

    var sectionStyle = {
        width: "100%",
        height: "400px",
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "cover"
    };


    return (
        <div>
            {/* <header className="ow  sticky-top pos-sticky"> */}
                <Header />
            {/* </header> */}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger"> {error} </MessageBox>
            ) : (
                <>
                    <div className="ow center">
                        {/* <p className="display-1"> Hello World</p> */}
                        {
                            products.map(product => {
                                if (product.category === 'Home Backgrounnd') {
                                    return (
                                        <>
                                            <div className=" text-center  text-white" key={product._id} style={{ backgroundImage: `url(${product.image})`, width: '100%', height: '70vh', backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
                                                <div className="home-bg">
                                                    <h1 className="font-weight-bolder pt-5"> {product.name} </h1>
                                                    <p className=" font-weight-light">{product.description}</p>
                                                </div>

                                            </div>
                                            <div className="text-center bg-cream">
                                                <h1 className="display-4 font-weight-bold p-5"> {product.name} </h1>
                                            </div>
                                        </>
                                    )
                                }
                            })
                        }
                        <div className="ow pt-5">
                                    {
                                        products.slice(0, 4).map(product => {
                                            if (product.category === 'Donuts') {
                                                return (
                                                    <>
                                                        <div className="card pd-card home-card" key={product._id}>
                                                            <Link to={`/product/${product._id}`}>
                                                                <img className="medium" src={product.image} alt={product.name} />
                                                            </Link>
                                                            <div className="card-body">
                                                                <Link to={`/product/${product._id}`}>
                                                                    <h2 className="text-center pb-4 pt-3 text-dark">{product.name}</h2>
                                                                </Link>
                                                                <Link to={`/product/${product._id}`}>
                                                                    <div className="card-home-button">
                                                                        <button>ORDER</button>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}
