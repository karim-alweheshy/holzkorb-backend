"use strict"

const ProductModel = require('../models/product');

const create = (req, res) => {
	if (Object.keys(req.body).length === 0) {
		res.status(400).json({
			error: 'Bad Request',
			message: 'The request body is empty'
		});
	} else {
		const product = req.body
    	product.userId = req.user._id
		ProductModel.create(product)
			.then(product => res.status(201).json(product))
			.catch(error => res.status(500).json({
				error: 'Internal server error',
				message: error.message
			}));
	}
};

const read = (req, res) => {
	ProductModel.findById(req.params.id).exec()
		.then(product => {
			if (product) {
				res.status(200).json(product);
			} else {
				res.status(404).json({
					error: 'Not Found',
					message: 'Product not found'
				});
			}
		})
		.catch(error => res.status(500).json({
			error: 'Internal server error',
			message: error.message
		}))
}

const update = (req, res) => {
	if (Object.keys(req.body).length === 0) {
		res.status(400).json({
			error: 'Bad Request',
			message: 'The request body is empty'
		});
	} else {
		ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec()
			.then(product => res.status(200).json(product))
			.catch(error => res.status(500).json({
				error: 'Internal server errror',
				message: error.message
			}))
	}
}

const remove = (req, res) => {
	ProductModel.findByIdAndRemove(req.params.id).exec()
		.then(product => res.status(200).json(({message: 'Product with id${req.param.id} was deleted.'})))
		.catch(error => res.status(500).json({
			error: 'Internal server errror',
			message: error.message
		}))
}

const list = (req, res) => {
  ProductModel.find({ userId: req.user._id })
		.exec()
		.then(products => res.status(200).json(products))
		.catch(error => res.status(500).json({
			error: 'Internal server errror',
			message: error.message
		}))
}

module.exports = {
	create,
	read,
	update,
	remove,
	list
};
