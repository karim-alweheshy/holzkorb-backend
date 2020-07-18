"use strict";

const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

var ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	subtitle: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	ownerId: {
		type: ObjectId,
		required: true
	}
});

ProductSchema.add({ imageURLs: [String] });

ProductSchema.set('timestamps', true);

module.exports = mongoose.model('Product', ProductSchema);