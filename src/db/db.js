const { MongoClient } = require('mongodb')

const connectionString = "mongodb+srv://sitanDev:gigolo87@whoami.t0f8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var dataBase;

class DataBase{
	constructor(dbName){
		this.dbName = dbName
	}

	connect() {
		console.log('conecting...')
		return new Promise((resolve, reject) => {
			MongoClient.connect(connectionString, (err, client) => {
				if(err){
					reject(err)
				}else{
					dataBase = client.db(this.dbName)
					resolve(client.db(this.dbName))
				}
			})
		})
	}


	getCollection = (name) => {
		return dataBase.collection(name)
	}
}

module.exports = DataBase

	
// const dbClient = async() => {
// 	const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
// 	const connection = await client.connect()  
// 	const db = connection.db('testData')
	
// 	// const getDB = (db) => {
// 	// 	return connection.db(db)
// 	// }

// 	const getCollection = (collection) => {
// 		return db.collection(collection)
// 	}
// 	const closeConnection = () => {
// 		client.closeConnection()
// 	}

// 	return {
// 		getCollection,
// 		closeConnection
// 	}

// }

// export default  dbClient

// class DataBase {
// 	constructor(dbName){
// 		this.client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
// 		this.db = dbName
// 	}

// 	async connect (){
// 		 await this.client.connect()
// 		// client.db(this.db)
// 	}

// 	getCollection(collName){
// 		// const db = this.client.connect(this.db)
// 		return this.client.db(this.db).collection(collName)
// 	}

// 	closeConnection() {
// 		this.client.close()
// 	}
// }

// module.exports = DataBase