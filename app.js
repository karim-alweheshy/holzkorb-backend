"use-strict";

const http = require('http');
const mongoose = require('mongoose');

const api = require('./src/api');
const config = require('./src/config');

api.set('port', config.port);

const server = http.createServer(api);

const User = require('./src/models/user')
const Product = require('./src/models/product')
const InventoryItem = require('./src/models/inventory-item')

mongoose
	.connect(config.mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
	.then(() => server.listen(config.port))
	.catch(err => {
		console.log('Error connecting to the database', err.message);
		process.exit(err.statusCode);
	});

const mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);

server.on('listening', () => {
	console.log("API is running in port " + config.port);
});

server.on('error', (err) => {
	console.log('Error in the server', err.message);
	process.exit(err.statusCode);
});
