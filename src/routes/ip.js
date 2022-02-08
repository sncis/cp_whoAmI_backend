const express = require('express')
const ipRouter = express.Router()

ipRouter.get('/', (req,res)=> {
	console.log(`request ip is: ${req.ip}` )
		console.log(`request header is:` )
		console.log(req.headers)
	
		// let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
		let ip ='46.128.226.84'
		res.send(ip)
})


module.exports = ipRouter