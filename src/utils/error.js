class DatabaseError extends Error{
	constructor(message){
		super(message)
		this.name = "DatabaseError"
	}
}

module.exports = DatabaseError

// module.exports ={
// 	DatabaseError
// }