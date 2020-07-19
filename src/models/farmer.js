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
    imageUrl: {
      type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

FarmerSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const farmer = this
    if (farmer.isModified('password')) {
        farmer.password = await bcrypt.hash(farmer.password, 8)
    }
    next()
})


FarmerSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    console.log("gen token")
    const farmer = this
    const token = jwt.sign({_id: farmer._id}, config.JwtSecret)
    farmer.tokens = farmer.tokens.concat({token})
    await farmer.save()
    return token
}

FarmerSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    // console.log("find", email)
    const farmer = await Farmer.findOne({email: email})
    console.log("farmer", farmer)
    if (!farmer) {
        throw new Error({error: 'Invalid email credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password, farmer.password)
    console.log("farmer", isPasswordMatch)
    if (!isPasswordMatch) {
        throw new Error({error: 'Invalid  credentials'})
    }
    return farmer
}

const Farmer = mongoose.model('Farmer', FarmerSchema);

module.exports = Farmer