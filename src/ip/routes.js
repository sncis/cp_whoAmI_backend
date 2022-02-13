const express = require('express')
// const ipService = require('./service')
const { getIp } = require('./service')
const http =require("http")


const router = express.Router()

// router.get('/', ipService.getIp)
router.get('/', (req,res, next) => {
	// getIp().catch(next)

	console.log("*************IP")
	let ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress

	try {
		let resp = http.get(`http://ip-api.com/json/${ip}`)
		if(!resp.data){
			throw new Error('no response from Ip')
		}
		console.log(resp.data)
		res.header("Content-Type", 'application/json')
		resp.status(200).json(resp.data)

	}catch(err){
		next(err)
	}

	
})


module.exports = router