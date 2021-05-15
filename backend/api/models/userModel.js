const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        // required: true
    },
    image: {
        type: String,
        //  required: true,
    },
    // address: [{
        streetName: {
            type: String,
            // required: true
        },
        city: {
            type: String,
            // required: true
        },
        postalCode: {
            type: String,
            // required: true
        },
        country: {
            type: String,
            // required: true
        },
    // }],
    nationality: {
        type: String,
        // required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        // required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
},
    {
        timestamps: true
    })

const User = mongoose.model('User', UserSchema)
module.exports = User