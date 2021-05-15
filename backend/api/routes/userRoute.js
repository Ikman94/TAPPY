const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const data = require('../../data');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const generateToken = require('../../util');
const isAuth = require('../../utils');
const isAdmin = require('../../utils');

let routes = (app) => {
    app.get('/users/seed', expressAsyncHandler(async (req, res) => {
        // await User.remove({});
        let createdUsers = await User.insertMany(data.users);
        res.send(createdUsers)
    }))

    app.post('/users/signin', expressAsyncHandler(async (req, res) => {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' })
    }));

    app.post(
        '/users/register',
        expressAsyncHandler(async (req, res) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                title: req.body.title,
                phone: req.body.phone,
                dob: req.body.dob,
                streetName: req.body.streetName,
                city: req.body.city,
                postalCode: req.body.postalCode,
                country: req.body.country,
                nationality: req.body.nationality,
                password: bcrypt.hashSync(req.body.password, 8),
            });
            const createdUser = await user.save();
            res.send({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                title: createdUser.title,
                phone: createdUser.phone,
                dob: createdUser.dob,
                streetName: createdUser.streetName,
                city: createdUser.city,
                postalCode: createdUser.postalCode,
                nationality: createdUser.nationality,
                isAdmin: createdUser.isAdmin,
                token: generateToken(createdUser),
            });
        })
    );

    app.get('/users/:id', expressAsyncHandler(async (req, res) => {
        let user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'User not found' })
        }
    }));

    app.put(
        '/users/profile',
        isAuth,
        expressAsyncHandler(async (req, res) => {
            const user = await User.findById(req.user._id);
            if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                if (req.body.password) {
                    user.password = bcrypt.hashSync(req.body.password, 8);
                }
                user.image = req.body.image || user.image;
                user.title = req.body.title || user.title;
                user.phone = req.body.phone || user.phone;
                user.dob = req.body.dob || user.dob;
                user.nationality = req.body.nationality || user.nationality;
                // user.address = {
                    user.streetName = req.body.streetName || user.streetName;
                    user.city = req.body.city || user.city;
                    user.postalCode = req.body.postalCode || user.postalCode;
                    user.country = req.body.country || user.country;
                // }
                const updatedUser = await user.save();
                res.send({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    image: updatedUser.image,
                    title: updatedUser.title,
                    phone: updatedUser.phone,
                    dob: updatedUser.dob,
                    nationality: updatedUser.nationality,
                    // address: {
                        streetName: updatedUser.streetName,
                        city: updatedUser.city,
                        postalCode: updatedUser.postalCode,
                        country: updatedUser.country,
                    // },
                    token: generateToken(updatedUser),
                });
            }
        })
    );

    app.get('/users', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {

        let users = await User.find({}).populate('order', 'totalPrice');
        users.user = await Order.find({ user: users.objectId })
        // console.log(users.user)
        res.send(users);
    }));

    app.delete(
        '/users/:id',
        isAuth,
        isAdmin,
        expressAsyncHandler(async (req, res) => {
            const user = await User.findById(req.params.id);
            if (user) {
                // if (user.email === 'admin@example.com') {
                //     res.status(400).send({ message: 'Can Not Delete Admin User' });
                //     return;
                // }
                const deleteUser = await user.remove();
                res.send({ message: 'User Deleted', user: deleteUser });
            } else {
                res.status(404).send({ message: 'User Not Found' });
            }
        })
    );

}
module.exports = routes;