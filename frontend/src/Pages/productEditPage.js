import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productsConstants';

export default function ProductEditPage(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [sku, setSku] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setSku(product.sku);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [product, dispatch, productId, successUpdate, props.history]);
    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: dispatch update product
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                category,
                brand,
                sku,
                countInStock,
                description,
            })
        );
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };


    return (
        <div className="form1">

            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product: {productId} </h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger"> {error} </MessageBox>}
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger"> {error} </MessageBox>
                            :
                            <>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter Name (required)"
                                        value={name}
                                        onChange={e => setName((e).target.value)}
                                        required>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        id="price"
                                        placeholder="Price(required)"
                                        value={price}
                                        onChange={e => setPrice((e).target.value)}
                                        required>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor="image">Image</label>
                                    <input
                                        type="text"
                                        id="image"
                                        placeholder="Image (required)"
                                        value={image}
                                        onChange={e => setImage((e).target.value)}
                                        required>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor="imageFile">Image File</label>
                                    <input
                                    type="file"
                                    id="imageFile"
                                    label="Select a file"
                                    onChange={uploadFileHandler}
                                    ></input>
                                </div>
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && (<MessageBox variant="danger"> {errorUpload} </MessageBox>)}
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        placeholder="Category (required)"
                                        value={category}
                                        onChange={e => setCategory((e).target.value)}
                                        required>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor="brand">Brand</label>
                                    <input
                                        type="text"
                                        id="brand"
                                        placeholder="Brand (required)"
                                        value={brand}
                                        onChange={e => setBrand((e).target.value)}
                                        required>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor="countInStock">CountInStock</label>
                                    <input
                                        type="text"
                                        id="countInStock"
                                        placeholder="CountInStock (required)"
                                        value={countInStock}
                                        onChange={e => setCountInStock((e).target.value)}
                                        required>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor="sku">Sku</label>
                                    <input
                                        type="text"
                                        id="sku"
                                        placeholder="Sku (required)"
                                        value={sku}
                                        onChange={e => setSku((e).target.value)}
                                        required>
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        placeholder="Description (required)"
                                        value={description}
                                        onChange={e => setDescription((e).target.value)}
                                        required>
                                    </textarea>
                                </div>
                                <div>
                                    <label />
                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-block checkout-button mt-5">
                                        Update Product
                                    </button>
                                </div>
                            </>
                }
            </form>
        </div>
    )
}
