/** IP route to call API with client IP to get data  */

const express = require('express')
const ipRouter = express.Router()
const axios = require('axios')
//used as dummy data
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

ipRouter.get('/', async(req,res, next)=> {
	console.log("*************IP ROUTE *************")
	let ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress
// console.log(ip)
	try {
		/** un-comment when real API shoudl be called */
		// let resp = await axios.get(`http://ip-api.com/json/${ip}`)
		let resp = await axios.get(`http://ip-api.com/json/109.43.51.220`)

		//for testing use real axios request because of body 
		// let resp = {data: data}
		// console.log(resp.data)

	
		if(!resp.data){
			res.status(204).json({data:{}})
		}
	
		res.status(200).json({data:resp.data})

	}catch(err){
		console.log(err)
		next(err)
	}

})


module.exports = ipRouter