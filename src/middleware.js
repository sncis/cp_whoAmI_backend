const errorLogger = (err, req,res,next) => {
	console.log("********* Error Logger **********")
	console.error(err)
	next(err)
}

const errorResponder = (err, req, res, next) => {
	res.header('Content-Type', "application/json")
	console.log(err)
	res.status(err.statusCode || 500).send(err.message)

}

module.exports = {
	errorLogger,
	errorResponder
}