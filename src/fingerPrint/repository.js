const db = require('../db/dbConnection')
const DatabaseError = require('../utils/error')

const storeFingerprint = async(data) => {
	console.log(data,"data")
	return db.get().collection('testCollection').insertOne(data)
		.catch(error => {
			throw new DatabaseError(`Failed to Insert data for Fingerprint ${data.fingerPrint} into DB`)
		})
		// console.log(`infos iserted with id : ${result.insertedId}`)
		// return result
}

const findEntries = async(fingerprintID) => {
	return db.get().collection('testCollection').find({fingerPrint: Number(fingerprintID)}).toArray()
		.catch((error) => {
			console.log(error)
			throw new DatabaseError(`Failed to find entries for fingerprint ${fingerprintID}`)
		})
}

const deleteEntries = async(fingerprintID) => {
	return db.get().collection('testCollection').deleteMany({fingerPrint: Number(fingerprintID)}).catch(error => {
		console.log(error)
		throw new DatabaseError(`Could not delete data for Fingerprint ${fingerprintID}`)
	})
}

module.exports = {
	storeFingerprint,
	findEntries,
	deleteEntries
}
