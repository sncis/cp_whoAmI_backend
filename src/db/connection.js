const { MongoClient } = require('mongodb')

const connectionString = "mongodb+srv://sitanDev:gigolo87@whoami.t0f8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
console.log(connectionString)

const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })

// const listDataBases = async(c) => {
// 	const dbList = await c.db().admin().listDatabases()

// 	console.log("DataBases:")
// 	dbList.databases.forEach(db => console.log(` - ${db.name}`))
// }

//  const mainConnection = async() => {
// 	console.log("connectionString", connectionString)

// 	try{
// 		await client.connect()
// 		await listDataBases(client)
// 	}catch (error){
// 		console.log(error)
// 	}
// 	finally{
// 		await client.close()
// 	}
// }

// const getClient = () => {
// 	return new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })

// }

// const connectToDB = () => {
// 	try{
// 		await 
// 	}
// }

// let dbConnection

// const connectToDB = (callback) => {
// 	client.connect((err, db) => {
// 		if(err || !db){
// 			return callback(error)
// 		}
// 		dbConnection = db.db('testData')
// 		return callback

// 	})
// }

// const getDB = () => {
// 	return dbConnection 
// }

// module.exports = {
// 	connectToDB,
// 	getDB
// }



const getDBCollection = async() => {
	try{
		await client.connect()
		const database = client.db('testData')
		return database.collection('testCollection')
	}catch(error){
		console.log(error)
	}
}

const closeConnection = () => {
	client.close()
}

const getDB = async() => {
	await client.connect()
	return client.db('testData')
}


module.exports = {
	getDBCollection,
	getDB,
	closeConnection
}

