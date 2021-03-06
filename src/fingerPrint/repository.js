const db = require('../db/dbConnection')
const DatabaseError = require('../utils/error')

const COLLECTION = 'whoami'
const storeFingerprint = async(data) => {
	console.log(data,"data")
	return db.get().collection(COLLECTION).insertOne(data)
		.catch(error => {
			throw new DatabaseError(`Failed to Insert data for Fingerprint ${data.fingerPrint} into DB`)
		})
}

const findEntries = async(fingerprintID) => {
	console.log("******FingrPrint ID")
	console.log(fingerprintID)
	return db.get().collection(COLLECTION).find({fingerPrint: Number(fingerprintID)}).toArray()
		.catch((error) => {
			throw new DatabaseError(`Failed to find entries for fingerprint ${fingerprintID}`)
		})
}

const deleteEntries = async(fingerprintID) => {
	return db.get().collection(COLLECTION).deleteMany({fingerPrint: Number(fingerprintID)}).catch(error => {
		console.log(error)
		throw new DatabaseError(`Could not delete data for Fingerprint ${fingerprintID}`)
	})
}

const getDistinctFingerprints = async() => {
	return db.get().collection(COLLECTION).distinct('fingerPrint')

}

module.exports = {
	storeFingerprint,
	findEntries,
	deleteEntries,
	getDistinctFingerprints
}
