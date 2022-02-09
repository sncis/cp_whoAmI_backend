const { MongoClient } = require('mongodb')

const connectionString = "mongodb+srv://sitanDev:gigolo87@whoami.t0f8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

module.exports = {
	getClient: async() => {
		const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
		await client.connect()
		return client
	},

	getCollection : (dbClient) => {
		const database = dbClient.db('testData')
		return database.collection('testCollection')
	},

	closeConnection: (dbClient) => {
		dbClient.close()
	}
}