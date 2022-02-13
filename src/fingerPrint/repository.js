const db = require("../db/dbConnection")

module.exports = {
	storeFingerprint: async(fingerprint) => {
		const dbClient = await db.getClient()
		const collection = db.getCollection(dbClient)
		console.log("fingerprint data")
		console.log(fingerprint)

		const result = await collection.insertOne(fingerprint)
		db.closeConnection(dbClient)

		console.log(`infos iserted with id : ${result.insertedId}`)
	},

	findEntries: async(id) => {
		const dbClient = await db.getClient()
		const collection = await db.getCollection(dbClient)
		const entries = await collection.find({fingerPrint: Number(id)}).toArray()

		db.closeConnection(dbClient)

		return entries

	},

	deleteEntries: async(id) => {
		const dbClient = await db.getClient()
		const collection = await db.getCollection(dbClient)
		console.log(`count of entries before deleting ${await collection.count()}`)
		const entries = await collection.deleteMany({fingerPrint: Number(id)})
		console.log(`count of entries AFTER deleting ${await collection.count()}`)

		db.closeConnection(dbClient)
		return entries

	}
		
		
	
}