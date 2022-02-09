const routes = require('./routes/indexRoutes')

const express = require('express');
const fs = require('fs')
const https = require('https')
const cors = require('cors')


const privateKey  = fs.readFileSync('/Users/sitancisse/Desktop/CODE/Thesis/CP/cert/key.pem', 'utf8');
const privateCert  = fs.readFileSync('/Users/sitancisse/Desktop/CODE/Thesis/CP/cert/cert.pem', 'utf8');


const credentials = {key: privateKey, cert:privateCert}

// curl -X POST -H "Content-Type:application/json" http://localhost:5000/infos -d '{"infos":{"data":{"id":1,"keyboad": "QWERTY"}}}'
const app = express()
const httpsServer = https.createServer(credentials,app)

const PORT= 5000
const HTTPS_PORT= 5443


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(({
	origin: ["http://localhost:3000"]
})))

app.use('/ip', routes.ip)
app.use('/fingerprint', routes.fingerprint)

// app.use((req,res,next) => {
// 	// res.header("Access-Control-Allow-Origin", "http://localhost:3000")
// 	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
// 	next()
// })

app.get('/', (req,res) => {
	console.log(`requested url :${req.url} \n request headers host: ${req.headers.host}`)
	res.send('<h1>Hello from backend </h1>')
})

// const errorHandling = err => {
// 	if(err){
// 		console.log(err)
// 		process.exit()
// 	}
// }

// db.connectToDB(errorHandling)

app.listen(PORT, () => {
	console.log(`HTTP server started at port: ${PORT}`)
})

// httpsServer.listen(HTTPS_PORT, () => {
// 	console.log(`HTTPS Server started at port: ${HTTPS_PORT}` )
// })

