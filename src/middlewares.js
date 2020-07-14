"use strict"

const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('./models/user')

function checkAuthentication(req, res, next) {
	console.log(req.header('Authorization'))
	const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : ''
    const data = jwt.verify(token, config.JwtSecret)
	User.findOne({ _id: data._id, 'tokens.token': token })
		.then(user => {
        	req.user = user
			req.token = token	
			next()
		})
    	.catch(error => res.status(401).send({ error: 'Not authorized to access this resource' }))
}

function allowCrossDomain(req, res, next) {
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}
    next()
}

module.exports = {
	checkAuthentication,
    allowCrossDomain
}
