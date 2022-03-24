const express = require('express');
const fs = require('fs')
const https = require('https')
const cors = require('cors')
require('dotenv').config()

const db = require('./db/dbConnection')
const routes = require('./indexRoutes')
const { errorLogger, errorResponder, jsonValidationErrorResponder} = require("./utils/middleware")

const app = express()

app.use(express.json({limit:'3500b',type: 'application/json'}))
app.use(express.urlencoded({ extended: true }));


app.use(cors({
	origin: ["http://localhost:3000", 'https://cpwhoami.herokuapp.com'],
	credentials: true,
	exposeHeaders:['Content-Length', 'X-Frame-Options', 'X-XSS-Protection','X-Content-Type-Options']
}))


app.use((req,res,next) => {
	// res.set("Access-Control-Allow-Origin", "http://localhost:3000 https://cpwhoami.herokuapp.com https://git.heroku.com/cpwhoami.git")
	res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
	res.set("Content-Type", 'application/json')
	res.set('Strict-Transport-Security', 'max-age=15552000')
	res.set('Content-Security-Policy',	"default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'")
	res.set("X-Frame-Options", "deny")
	res.set("X-XSS-Protection", "1;mode=block")
	res.set("X-Content-Type-Options", "nosniff")
	res.set("Feature-Policy", "camera 'none'; autoplay 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none';  magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-get 'none'; sync-xhr 'none'; usb 'none'; xr-spatial-tracking 'none'",
	)
	next()
})

app.use('/ip', cors(),routes.ip)
app.use('/fingerprint', cors(), routes.fingerprint)

app.use(jsonValidationErrorResponder)
app.use(errorLogger)
app.use(errorResponder)

db.connect(error => {
	if(error){
		console.log(error)
	}
})


app.listen(process.env.PORT, () => {
	console.log(`HTTP server started at port: ${process.env.PORT}`)
})