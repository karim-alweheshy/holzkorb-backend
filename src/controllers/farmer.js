"use strict"

const Farmer = require('../models/farmer');

function register(req, res) {
    const farmer = new Farmer(req.body)
    farmer.save()
        .then(farmer => farmer.generateAuthToken())
        .then(token => res.status(201).send({token: token}))
        .catch(error => res.status(400).send(error))
}

function me(req, res) {
    res.send(req.farmer)
}

function update(req, res) {
    const farmer = req.body
    console.log(farmer)
    Farmer.updateOne({_id: farmer._id}, farmer)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error))
}

module.exports = {
    register,
    me,
    update,
};