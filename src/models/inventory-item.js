'use strict';

const mongoose = require('mongoose');

var InventroyItemSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  totalUnitsCount: {
    type: Number,
    required: true,
  },
  minUnitsPerOrder: {
    type: Number,
    required: true,
  },
  orderUnit: {
    type: String,
    enum: ['KG', 'Box', 'Bottle', 'Package'],
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('InventroyItem', InventroyItemSchema);
