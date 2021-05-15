import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import Header from '../components/Header';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [title, setTitle] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [nationality, setNationality] = useState('');
    const [image, setImage] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin')
    }
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo, user]);
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {
            dispatch(updateUserProfile({
                userId: user._id, name, email, password, title,
                phone,
                dob,
                // address:{
                    streetName,
                    city,
                    postalCode,
                    country,
                // },
                nationality
            }));
        }
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await axios.post('/api/uploads', bodyFormData, {
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
        <div>
            <Header />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                )}
                {successUpdate && (
                    <MessageBox variant="success">
                        Profile Updated Successfully
                    </MessageBox>
                )}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter Title"
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Enter phone"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="dob">Dob</label>
                            <input
                                type="date"
                                id="dob"
                                placeholder="Enter dob"
                                required
                                onChange={(e) => setDob(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="streetName">Street Name</label>
                            <input
                                type="text"
                                id="streetName"
                                placeholder="Enter streetName"
                                required
                                onChange={(e) => setStreetName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="Enter city"
                                required
                                onChange={(e) => setCity(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                placeholder="Enter postalCode"
                                required
                                onChange={(e) => setPostalCode(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                placeholder="Enter country"
                                required
                                onChange={(e) => setCountry(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="nationality">Nationality</label>
                            <input
                                type="text"
                                id="nationality"
                                placeholder="Enter nationality"
                                required
                                onChange={(e) => setNationality(e.target.value)}
                            ></input>
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
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Enter confirm password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label />
                            <button className="primary" type="submit">
                                Update
                                    </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}