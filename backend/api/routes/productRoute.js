const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const data = require('../../data');
const Product = require('../models/productModel');
const isAuth = require('../../utils');
const isAdmin = require('../../utils');


let routes = (app) => {
    app.get('/products', expressAsyncHandler(async (req, res) => {
        let products = await Product.find({});
        products = JSON.parse(JSON.stringify(products))
        let data = { title: "Products", products }
        res.send(products);
    }));

    app.get('/products/seed', expressAsyncHandler(async (req, res) => {
        // await Product.remove({})
        let = createdProducts = await Product.insertMany(data.products);
        res.send(createdProducts)
    }));

    app.get('/products/:id', expressAsyncHandler(async (req, res) => {
        let product = await Product.findById(req.params.id);
        if (product) {
            res.send(product)
        } else {
            res.status(404).send({ message: 'Product not Found' });
        }
    }));

    app.post('/products', isAuth, isAdmin, expressAsyncHandler(async (req, res)=>{
        let product = new Product({
            name: 'Mango',
            image: '/img/watch1.png',
            price: 6000,
            category: 'Cookies',
            brand: 'Maya',
            sku: '32256',
            countInStock: '20',
            rating: '5',
            numReviews: '20',
            description: 'Beautiful infused Hungarian spice cookies'
        });

       const createdProduct = await product.save();
        res.send({ message: 'Product created', product: createdProduct});
    }));

    app.put('/products/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const productId = req.params.id
        let product = await Product.findById(productId)
        if(product){
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            product.image = req.body.image || product.image;
            product.category = req.body.category || product.category;
            product.countInStock = req.body.countInStock || product.countInStock;
            product.sku = req.body.sku || product.sku;
            product.brand = req.body.brand || product.brand;
            product.description = req.body.description || product.description;

            const updatedProduct = await product.save()
            res.send({message: 'Product Updated', updatedProduct})
        }else{
            res.status(404).send({message: 'Product not Found'})
        }
    }));

    app.delete('/products/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        let product = await Product.findById(productId);
        if(product){
            const deletedProduct = await product.remove();
            res.send({message: 'Product Deleted', product: deletedProduct})
        }else{
            res.status(404).send({ message: 'Product not Found' })
        }
    }))

}

module.exports = routes