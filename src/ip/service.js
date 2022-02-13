module.exports = {
	getIp: (req,res, next) => {
		let ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress
		// let ip ='46.128.226.84'
		if(ip){
			res.status(200).send(ip)
		}
	}

	}

