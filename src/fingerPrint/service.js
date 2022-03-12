const repo = require('./repository')

const storeFingerprint = async(req,res,next) => {
	try{
		await repo.storeFingerprint(req.body)
		res.status(201).json({data:'fingerprint stored succesfully'})
	}catch(error){
		next(error)
	}
}

const getLastVisits = async(req, res, next) => {
	try{
		const entries = await repo.findEntries(req.query.id)
		res.status(200).json({data:entries})
	}catch(error){
		next(error)
	}
}

const deleteEntries = async(req,res,next) => {
	try{
		const entries = await repo.deleteEntries(req.query.id)
		res.status(200).json({data:{
			deletedCount:entries.deletedCount}, 
			message: `${entries.deletedCount} entries has been deleted`})
	}catch(error){
		next(error)
	}
}

module.exports = { 
	storeFingerprint,
	getLastVisits,
	deleteEntries
}