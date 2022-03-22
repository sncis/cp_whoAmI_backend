const { ValidationError } = require("express-json-validator-middleware");

const errorLogger = (error, req,res,next) => {
	console.log("********* Error Logger **********")
	next(error)
}

const errorResponder = (error, req, res, next) => {
	res.header('Content-Type', "application/json")
	res.status(error.statusCode).json({data:[],error: error.message})
	next(error)
}

const jsonValidationErrorResponder = (error,req,res,next) => {	
	if(res.headerSent){
		return next(error)
	}
	const isValidationError = error instanceof ValidationError;
	if (!isValidationError) {
		next(error);
	}
	res.status(400).json({error: error.validationErrors});
	// next(error)
}



module.exports = {
	errorLogger,
	errorResponder,
	jsonValidationErrorResponder
}