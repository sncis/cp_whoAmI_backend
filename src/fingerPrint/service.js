const repo = require('./repository')
const {idValidator} = require('../utils/validators')

const storeFingerprint = async(req,res,next) => {
	try{
		await repo.storeFingerprint(req.body)
		res.status(201).json({data:'fingerprint stored succesfully'})
	}catch(error){
		next(error)
	}
}

const getLastVisits = async(req, res, next) => {
	const id = idValidator(req.query.id) ? req.query.id : 0
	
	try{
		const entries = await repo.findEntries(id)
		res.status(200).json({data:entries})
	}catch(error){
		next(error)
	}
}

const deleteEntries = async(req,res,next) => {
	const id = idValidator(req.query.id) ? req.query.id : 0
	try{
		const entries = await repo.deleteEntries(id)
		res.status(200).json({data:{
			deletedCount:entries.deletedCount}, 
			message: `${entries.deletedCount} entries has been deleted`})
	}catch(error){
		next(error)
	}
}

const getAllDistinctFingerprints = async(req,res,next) =>{
	try{
		const entries = await repo.getDistinctFingerprints()
		res.status(200).json({data:entries})
	}catch(error){
		next(error)
	}
}

module.exports = { 
	storeFingerprint,
	getLastVisits,
	deleteEntries,
	getAllDistinctFingerprints
}