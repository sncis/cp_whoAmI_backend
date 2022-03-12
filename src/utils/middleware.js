const { ValidationError } = require("express-json-validator-middleware");

const errorLogger = (error, req,res,next) => {
	console.log("********* Error Logger **********")
	console.error(error)
	next(error)
}

const errorResponder = (error, req, res, next) => {
	res.header('Content-Type', "application/json")
	console.log(error.message)
	res.status(error.statusCode).send({error: error.message})
	next()
}

const jsonValidationError = (error,req,res,next) => {
	// console.log(req.body)
	
	if(res.headerSent){
		return next(error)
	}
	const isValidationError = error instanceof ValidationError;
	if (!isValidationError) {
		return next(error);
	}

	console.log("******* json validation error *********")
	console.log(error.validationErrors)


	res.status(400).json({errors: error.validationErrors});

	next()
}



module.exports = {
	errorLogger,
	errorResponder,
	jsonValidationError
}