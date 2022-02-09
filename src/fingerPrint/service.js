const finperprintRepo = require('./repository')

module.exports ={
	storeFingerprint: (req,res) => {
		let data = req.body
		try{
			finperprintRepo.storeFingerprint(data)
			res.status(201).send({data:'fingerprint stored succesfully'})
		}catch(error){
			console.log(error)
		res.status(500).send({error: "Internal error with DB"})
		}
	},

	getLastVisits: async(req,res) => {
		let id = req.query.id
		try{
			let entries = await finperprintRepo.findEntries(id)
			res.status(200).send(entries)
			
		}catch(error){
			console.log(error)
			res.status(500).send({error: "some error in finding fingerpitn data"})
		}
	
	}
}