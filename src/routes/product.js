"use strict"

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const ProductController = require('../controllers/product');

router.get('/', middlewares.checkAuthentication, ProductController.list);
router.post('/', middlewares.checkAuthentication, ProductController.create);
router.get('/:id', ProductController.read);
router.put('/:id', middlewares.checkAuthentication, ProductController.update);
router.delete('/:id', middlewares.checkAuthentication, ProductController.remove);

module.exports = router;