const finperprintRepo = require('./repository')

// -1041013258

module.exports = {
	storeFingerprint: async(req, res, next) => {
		let data = req.body
		let length = req.get("content-length")
		console.log('length', length)
		try{
			console.log("store fingerPrint")
			console.log(data)
			let re = await finperprintRepo.storeFingerprint(data)
			// console.log("response from stored fingerprint")
			// console.log(re)
			res.status(201).send({data:'fingerprint stored succesfully'})
		}catch(error){
			next(error)
		}
	},

	getLastVisits: async(req,res,next) => {
		let id = req.query.id
		// console.log(id)
		try{
			let entries = await finperprintRepo.findEntries(id)
			res.status(200).send(entries)
			
		}catch(error){
			next(error)
			// console.log(error)
			// res.status(500).send({error: "some error in finding fingerpitn data"})
		}
	
	},

	deleteEntries: async(req,res,next) => {
		let id = req.query.id
		console.log(id)
		try{
			let entries = await finperprintRepo.deleteEntries(id)
			// console.log("entries from deletion")
			// console.log(entries)
			res.status(200).send({data: {deletedCount:entries.deletedCount}, message: `${entries.deletedCount} entries has been deleted`})
		}catch(err){
			next(err)
		}
	}
}