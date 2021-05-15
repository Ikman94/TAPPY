 const multer = require('multer');
 const express =require('express');
const isAuth = require('../../utils');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage })

 let routes = (app) => {
     app.post('/uploads', isAuth, upload.single('image'), (req, res) => {
         res.send(`/${req.file.path}`);
     });

 };

 module.exports = routes

