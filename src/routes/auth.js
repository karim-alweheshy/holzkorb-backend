"use strict"

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const AuthController = require('../controllers/user');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/addAddress', middlewares.checkAuthentication, AuthController.addAddress);
router.get('/me', middlewares.checkAuthentication, AuthController.me);
router.delete('/logout', middlewares.checkAuthentication, AuthController.logout);
router.delete('/logoutFromAllDevices', middlewares.checkAuthentication, AuthController.logoutFromAllDevices);

module.exports = router;
