import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function UserEditPage(props) {
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

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/userlist';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(register(name,
                email,
                password,
                title,
                phone,
                dob,
                streetName,
                city,
                postalCode,
                country,
                nationality));
        }
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
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
                    <label htmlFor="streetName">StreetName</label>
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
                    <label />
                    <button className="primary" type="submit">
                        Register
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}