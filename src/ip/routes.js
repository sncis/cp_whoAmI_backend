/** IP route to call API with client IP to get data  */

const express = require('express')
const ipRouter = express.Router()
const axios = require('axios')
const {ipValidator}  = require('../utils/validators')

ipRouter.get('/', async(req,res, next)=> {
	let ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress
	let valid = ipValidator(ip)

	if(valid){
		try {
			let resp = await axios.get(`http://ip-api.com/json/${ip}`)

			if(!resp.data){
				res.status(204).json({data:{}})
				return next()
			}
		
			res.status(200).json({data:resp.data})

		}catch(err){
			console.log(err)
			next(err)
		}
	}else{
		res.status(400).json({data:[]}) 
	}
})


module.exports = ipRouter