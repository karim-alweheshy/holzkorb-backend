"use strict"

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const InventoryItemController = require('../controllers/inventory-item');

router.get('/', InventoryItemController.list);
router.post('/', middlewares.checkAuthentication, InventoryItemController.create);
router.get('/:id', InventoryItemController.read);
router.put('/:id', middlewares.checkAuthentication, InventoryItemController.update);
router.delete('/:id', middlewares.checkAuthentication, InventoryItemController.remove);

module.exports = router;