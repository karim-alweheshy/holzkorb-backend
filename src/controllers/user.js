const express = require('express')
const User = require('../models/user')
const router = express.Router()
const mongoose = require("mongoose")

function register(req, res) {
    const user = new User(req.body)
    user.save()
        .then(user => user.generateAuthToken())
        .then(token => res.status(201).send({user, token}))
        .catch(error => res.status(400).send(error))
}

function login(req, res) {
    const {email, password} = req.body
    User.findByCredentials(email, password)
        .then(user => user.generateAuthToken())
        .then(token => res.status(200).send({token}))
        .catch(error => res.status(400).send(error))
}

function me(req, res) {
    res.send(req.user)
}

function addAddress(req, res) {
    const id = req.user._id
    const {address} = req.body
    User.findById(id)
        .then(user => user.addAddress(address))
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error))
}

function updateProfileImage(req, res) {
    const {id, url} = req.body
    console.log("id", id)
    User.findById(req.user._id)
        .then(user => user.updateProfileImage(url))
        .then(() => res.status(200).send())
        .catch(error => res.status(401).send(error))
}

function updateProfileInfo(req, res) {
    const id = req.user._id
    const {firstName, lastName} = req.body
    User.findById(id)
        .then(user => user.updateProfileInfo(firstName, lastName))
        .then(() => res.status(200).send())
        .catch(error =>res.status(400).send(error))

}

function logout(req, res) {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token
    })
    req.user.save()
        .then(user => res.send())
        .catch(error => res.status(500).send(error))
}

function logoutFromAllDevices(req, res) {
    // Log user out of all devices
    req.user.tokens.splice(0, req.user.tokens.length)
    req.user.save()
        .then(user => res.status(200).send())
        .catch(error => res.status(500).send(error))
}

module.exports = {
    register,
    login,
    me,
    addAddress,
    logout,
    logoutFromAllDevices,
    updateProfileImage,
    updateProfileInfo
}