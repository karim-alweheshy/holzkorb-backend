"use-strict"

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    profileImageUrl: {
        type: String,
        required: false,
        // validate: value => {
        //     if (!isURL(value)) {
        //         throw new Error({error: 'Invalid image URL'})
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    addresses:[ {
        address: {
            type: new mongoose.Schema({
                postalCode: {
                    type: String,
                    required: true
                },
                town: {
                    type: String,
                    required: true
                },
                streetName: {
                    type: String,
                    required: true
                },
                houseNumber: {
                    type: String,
                    required: true
                }
            }),
            required: false
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, config.JwtSecret)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.updateProfileImage = async function (url) {
    const user = this
    user.profileImageUrl = url
    await user.save()
}

userSchema.methods.updateProfileInfo = async function (firstName, lastName) {
    const user = this
    user.firstName = firstName
    user.lastName = lastName
    await user.save()
}

userSchema.methods.addAddress = async function (address) {
    // append address
    //TODO check for uniqueness
    const user = this
    user.addresses = user.addresses.concat({address})
    await user.save()
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({email})
    if (!user) {
        throw new Error({error: 'Invalid login credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({error: 'Invalid login credentials'})
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User