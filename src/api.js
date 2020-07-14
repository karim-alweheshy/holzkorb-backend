"use strict"

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const middlewares = require('./middlewares')

const auth = require('./routes/auth')
const product = require('./routes/product')
const inventoryItem = require('./routes/inventory-item')

const api = express()

api.use(helmet())
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
api.use(middlewares.allowCrossDomain)

api.get('/', (req, res) => {
	res.json({
		name: 'Holzkorb'
	})
})

api.use('/auth', auth)
api.use('/products', product)
api.use('/inventory', inventoryItem)


module.exports = api
