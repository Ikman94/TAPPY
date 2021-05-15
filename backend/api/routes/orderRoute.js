const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const isAuth = require('../../utils');
const isAdmin = require('../../utils');

let routes = (app) => {

    app.get('/orders/mine', isAuth, expressAsyncHandler( async (req, res) => {
        let orders = await Order.find({user: req.user._id});
        res.send(orders)
    }));

    app.get('/orders', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
        let orders = await Order.find({}).populate('user', 'name');
        orders.order = await User.find({ order: orders.objectId })
        // console.log(orders.order)
        res.send(orders);
    }));

    app.post('/orders', isAuth, expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is Empty' });
        } else {
            let order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id
            });
            let createdOrder = await order.save();
            res.status(201).send({ message: 'New Order Created', order: createdOrder })
        }
    }));

    app.get(
        '/orders/:id',
        isAuth,
        expressAsyncHandler(async (req, res) => {
            const order = await Order.findById(req.params.id);
            if (order) {
                res.send(order);
            } else {
                res.status(404).send({ message: 'Order Not Found' });
            }
        })
    );

    app.put('.orders/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email: req.body.email_address
            };
            const updaterdOrder = await order.save();
            res.send({ message: 'Order Paid', order: updaterdOrder });
        } else {
            res.status(404).send({ mesage: 'Order not Found' })
        }
    }));
    app.delete('/orders/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const orderId = req.params.id;
        let order = await Order.findById(orderId);
        if (order) {
            const deletedOrder = await order.remove();
            res.send({ message: 'Order Deleted', product: deletedOrder })
        } else {
            res.status(404).send({ message: 'Order not Found' })
        }
    }))
}
module.exports = routes;