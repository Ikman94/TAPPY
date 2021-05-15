import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import AdminHeader from '../components/AdminHeader';
import AdminSide from '../components/AdminSide';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productsConstants';

export default function ProductListPage(props) {
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: createLoading,
        error: createError,
        success: createSuccess,
        product: createdProduct
    } = productCreate;
    const dispatch = useDispatch()

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    useEffect(() => {
        if (createSuccess) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        dispatch(listProducts())
    }, [dispatch, props.history, createdProduct, createSuccess]);

    if (successDelete) {
        dispatch({ type: PRODUCT_DELETE_RESET });
    }
    const deleteHandler = (product) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteProduct(product._id))
        }
    };
    const createHandler = () => {
        dispatch(createProduct())
    }
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
                                    <h1>Product List</h1>
                                    <div className="button">
                                        {/* <!-- Button trigger modal --> */}
                                        <button type="button" className="btn btn-dark btn-block checkout-button mt-5 " onClick={createHandler}>
                                            Post a Product
                                        </button>
                                    </div>
                                </div>
                                {loadingDelete && <LoadingBox></LoadingBox>}
                                {errorDelete && <MessageBox variant="danger"> {errorDelete} </MessageBox>}
                                {createLoading && <LoadingBox></LoadingBox>}
                                {createError && <MessageBox variant="danger"> {createError} </MessageBox>}
                                {
                                    loading ? <LoadingBox></LoadingBox> :
                                        error ? <MessageBox variant="danger"> {error} </MessageBox>
                                            :
                                            // (
                                            <>
                                                <table className="table  table-container font">
                                                    <thead className="bg-dark text-white">
                                                        <tr>
                                                            <th className="border-left border-light p-4">Name</th>
                                                            <th className="border-left border-light p-4">Sku</th>
                                                            <th className="border-left border-light p-4">Price</th>
                                                            <th className="border-left border-light p-4">Stock</th>
                                                            <th className="border-left border-light p-4">Category</th>
                                                            <th className="border-left border-light p-4">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.map((product) => (
                                                            <tr key={product._id}>
                                                                <td className="p-4 font-weight-bold"> <img src={product.image} alt={product.name} className="small smaller pr-3" />{product.name} </td>
                                                                <td className="border-left border-light p-4 text-secondary">{product.sku}</td>
                                                                <td className="border-left border-light font-weight-bold p-4">₦{product.price}</td>
                                                                <td className="border-left border-light p-4 text-secondary">{product.countInStock}</td>
                                                                <td className="border-left border-light p-4 text-secondary">{product.category}</td>
                                                                <td className="border-left border-light p-4">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-info small mr-3"
                                                                        onClick={() =>
                                                                            props.history.push(`/product/${product._id}/edit`)
                                                                        }
                                                                    >
                                                                        <i className="fa fa-pencil" aria-hidden="true"> </i>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-outline-danger small"
                                                                        onClick={() => deleteHandler(product)}
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
