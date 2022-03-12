const { MongoClient } = require('mongodb')
const DatabaseError = require('../utils/error')


const ATLAS_URI = process.env.ATLAS_URI
// const connectionString = "mongodb+srv://sitanDev:gigolo87@whoami.t0f8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let dataBase;

console.log("Atlas uri ", ATLAS_URI)

const connect = () => new Promise((resolve, reject) => {
		MongoClient.connect(ATLAS_URI, (err, client) => {
			if(err){
				console.log(err)
				reject(new DatabaseError("Failed to connect to DataBase"))
			}else{
				dataBase = client.db(this.dbName)
				resolve(client.db(this.dbName))
			}
		})
	})
	
const get = () => {
	if(!dataBase) throw new Error("No connection to DB")
	return dataBase
}


module.exports={
	connect,
	get
}
