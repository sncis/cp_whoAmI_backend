const express = require('express');
const fs = require('fs')
const https = require('https')
const cors = require('cors')
require('dotenv').config()

const db = require('./db/dbConnection')
const routes = require('./indexRoutes')
const { errorLogger, errorResponder, jsonValidationErrorResponder} = require("./utils/middleware")

const app = express()

app.use(express.json({limit:'2000b',type: 'application/json'}))
app.use(express.urlencoded({ extended: true }));


app.use(cors(({
	origin: ["http://localhost:3000", 'https://cpwhoami.herokuapp.com/'],
	credentials: true,
	exposeHeaders:['Content-Length', 'X-Frame-Options', 'X-XSS-Protection','X-Content-Type-Options']
})))

app.use('/ip', routes.ip)
app.use('/fingerprint',routes.fingerprint)

app.use(jsonValidationErrorResponder)
app.use(errorLogger)
app.use(errorResponder)

app.use((req,res,next) => {
	// res.header("Access-Control-Allow-Origin", "http://localhost:3000")
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
	res.header("Content-Type", 'application/json')

	// res.header('Strict-Transport-Security', 'max-age=15552000')
	// res.header('Content-Security-Policy',	"default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'")
	// res.header("X-Frame-Options", "deny")
	// res.header("X-XSS-Protection", "1;mode=block")
	// res.header("X-Content-Type-Options", "nosniff")
	// res.header("Feature-Policy", "camera 'none'; autoplay 'none'; fullscreen 'self'; geolocation 'self'; gyroscope 'self';  magnetometer 'self'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-get 'none'; sync-xhr 'self'; usb 'none'; xr-spatial-tracking 'none'",
	// )
	next()
})

db.connect(error => {
	if(error){
		console.log(error)
	}
})


app.listen(process.env.PORT, () => {
	console.log(`HTTP server started at port: ${process.env.PORT}`)
})