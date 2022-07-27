const mongoose = require('mongoose')
const moment = require('moment');
const now = moment();


const userSchema = new mongoose.Schema({


    Name: {

        type: String,
        required: true,

    },

    Email: {

        type: String,
        required: true,

    },

    Avatar: {

        type: String,
        required: true,

    },

    Address: {

        type: String,
        required: true

    },

    Country: {

        type: String,
        required: true

    },

    Age: {

        type: Number,

    },

    timestamps: { type: String, Default: now.format("dddd, MMMM Do YYYY, h:mm:ss a") }

})




module.exports = mongoose.model('User', userSchema)