"use strict";

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

var FarmerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {

        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {

        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

FarmerSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const farmer = this
    const token = jwt.sign({_id: farmer._id}, config.JwtSecret)
    farmer.tokens = farmer.tokens.concat({token})
    await farmer.save()
    return token
}

module.exports = mongoose.model('Farmer', FarmerSchema);