const express = require('express');
const fs = require('fs')
const https = require('https')
const cors = require('cors')
require('dotenv').config()

const db = require('./db/dbConnection')
const routes = require('./indexRoutes')
const { errorLogger, errorResponder, jsonValidationErrorResponder} = require("./utils/middleware")



const privateKey  = fs.readFileSync('/Users/sitancisse/Desktop/CODE/Thesis/CP/cert/key.pem', 'utf8');
const privateCert  = fs.readFileSync('/Users/sitancisse/Desktop/CODE/Thesis/CP/cert/cert.pem', 'utf8');


const credentials = {key: privateKey, cert:privateCert}

// curl -X POST -H "Content-Type:application/json" http://localhost:5000/infos -d '{"infos":{"data":{"id":1,"keyboad": "QWERTY"}}}'
const app = express()
const httpsServer = https.createServer(credentials,app)


const PORT = 5000
const HTTPS_PORT= 5443


app.use(express.json({limit:'2000b',type: 'application/json'}))
app.use(express.urlencoded({ extended: true }));



app.use(cors(({
	origin: ["http://localhost:3000"],
	credentials: true,
	exposeHeaders:['Content-Length', 'X-Frame-Options', 'X-XSS-Protection','X-Content-Type-Options']
})))

app.use('/ip', routes.ip)
app.use('/fingerprint',routes.fingerprint)
// app.use('/test', routes.testRouter)

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
		// console.log("errror is db")
		console.log(error)
		// process.exit(1)
	}
})


app.listen(PORT, () => {
	console.log(`HTTP server started at port: ${PORT}`)
})

// httpsServer.listen(HTTPS_PORT, () => {
// 	console.log(`HTTPS Server started at port: ${HTTPS_PORT}` )
// })

