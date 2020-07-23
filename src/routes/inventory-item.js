"use strict"

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const InventoryItemController = require('../controllers/inventory-item');

router.get('/', middlewares.checkFarmerAuthentication, InventoryItemController.myList);
router.get('/all', InventoryItemController.list);
router.post('/', middlewares.checkFarmerAuthentication, InventoryItemController.create);
router.get('/:id', InventoryItemController.read);
router.put('/:id', middlewares.checkFarmerAuthentication, InventoryItemController.update);
router.delete('/:id', middlewares.checkFarmerAuthentication, InventoryItemController.remove);

module.exports = router;