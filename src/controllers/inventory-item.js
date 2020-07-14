'use strict';

const InventoryItemModel = require('../models/inventory-item');

const create = (req, res) => {
  console.log(req);
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });
  } else {
    InventoryItemModel.create(req.body)
      .then((inventoryItem) => res.status(201).json(inventoryItem))
      .catch((error) =>
        res.status(500).json({
          error: 'Internal server error',
          message: error.message,
        })
      );
  }
};

const read = (req, res) => {
  InventoryItemModel.findById(req.params.id)
    .exec()
    .then((inventoryItem) => {
      if (inventoryItem) {
        res.status(200).json(inventoryItem);
      } else {
        res.status(404).json({
          error: 'Not Found',
          message: 'Inventory item not found',
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        error: 'Internal server error',
        message: error.message,
      })
    );
};

const update = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });
  } else {
    InventoryItemModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .exec()
      .then((inventoryItem) => res.status(200).json(inventoryItem))
      .catch((error) =>
        res.status(500).json({
          error: 'Internal server errror',
          message: error.message,
        })
      );
  }
};

const remove = (req, res) => {
  InventoryItemModel.findByIdAndRemove(req.params.id)
    .exec()
    .then((inventoryItem) =>
      res
        .status(200)
        .json({ message: 'Inventory item with id${req.param.id} was deleted.' })
    )
    .catch((error) =>
      res.status(500).json({
        error: 'Internal server errror',
        message: error.message,
      })
    );
};

const list = (req, res) => {
  InventoryItemModel.find({})
    .exec()
    .then((inventoryItems) => res.status(200).json(inventoryItems))
    .catch((error) =>
      res.status(500).json({
        error: 'Internal server errror',
        message: error.message,
      })
    );
};

module.exports = {
  create,
  read,
  update,
  remove,
  list,
};
