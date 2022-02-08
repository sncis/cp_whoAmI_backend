const db = require('../db/connection')

const errorHandling = err => {
	if(err){
		console.log(err)
		process.exit()
	}
}

const storeFingerprintInfos = async(data) => {
	console.log('data in collection db method')
	console.log(data)
	
	const dbConnection = await db.getDBCollection()
	console.log(dbConnection)

	dbConnection.insertOne(data, (err) => {
		if(err){
			console.log('problems to insert data to DB')
			return
		}

		console.log('iserted data')

	})

	
}

module.exports = storeFingerprintInfos
