const db = require("../db/dbConnection")

module.exports = {
	storeFingerprint: async(fingerprint) => {
		const dbClient = await db.getClient()
		const collection = db.getCollection(dbClient)
		console.log("fingerprint data")
		console.log(fingerprint)

		const result = await collection.insertOne(fingerprint)
		console.log(`infos iserted with id : ${result.insertedId}`)
	},

	findEntries: async(id) => {

		const dbClient = await db.getClient()
		const collection = await db.getCollection(dbClient)
		
		return collection.find({fingerPrint: Number(id)}).toArray()
	}
	
}