const express = require('express')
const http =require("http")
const axios = require('axios');

const testRouter = express.Router()

const data= {
	status: 'success',
	country: 'Germany',
	countryCode: 'DE',
	region: 'BY',
	regionName: 'Bavaria',
	city: 'Munich',
	zip: '80331',
	lat: 48.1336,
	lon: 11.5658,
	timezone: 'Europe/Berlin',
	isp: '16 originated by AS35244',
	org: '',
	as: 'AS35244 Tele Columbus AG',
	query: '46.128.226.84'
}

testRouter.get('/', (req,res,next) => {
	res.send("Hello World")
})

testRouter.get('/ip', async(req,res,next) => {
	console.log("*************IP")
	let ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress
	console.log(ip)
	try{
		// let resp = await axios.get(`http://ip-api.com/json/${ip}`)
		// let resp = await axios.get(`http://ip-api.com/json/46.128.226.84`)
		// res.status(200).send(resp.data)
		res.status(200).send(data)

	}catch(err){
		next(err)
	}

})

module.exports = testRouter

