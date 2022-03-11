/** IP route to call API with client IP to get data  */

const express = require('express')
const ipRouter = express.Router()

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

ipRouter.get('/', (req,res, next)=> {
	console.log("*************IP ROUTE *************")
	let ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress

	try {
		/** un-comment when real API shoudl be called */
		// let resp = http.get(`http://ip-api.com/json/${ip}`)
		
		let resp = {data: data}
		
		if(!resp.data){
			throw new Error('no response from Ip API')
		}
		// console.log('data from ip/routes')
		// console.log(resp.data)
		res.header("Content-Type", 'application/json')
		res.status(200).json(resp.data)

	}catch(err){
		next(err)
	}

})


module.exports = ipRouter