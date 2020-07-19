"use strict"

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const FarmerController = require('../controllers/farmer');

router.post('/register', FarmerController.register);
router.get('/me', middlewares.checkFarmerAuthentication, FarmerController.me)
router.post('/login', FarmerController.login);
router.post('/update', middlewares.checkFarmerAuthentication, FarmerController.update)
module.exports = router;