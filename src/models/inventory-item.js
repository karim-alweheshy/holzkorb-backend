'use strict';

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

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
    type: String,
    required: true,
  },
  ownerId: {
    type: ObjectId,
    // required: true
  },
  imageUrl: {
    type: String
  },
  name: {
    type: String
  },
  userId: {
      type: String,
      // required: true
  }
});

module.exports = mongoose.model('InventroyItem', InventroyItemSchema);
