const express = require('express')
const infoRouter = express.Router()
const storeFingerprintInfos = require('../infos/infos')


infoRouter.get('/', (req,res)=> {

	let canvas = req.body.canvasHash
	console.log("canvas", canvas)
	console.log("requst body")
	console.log(req.body)

	return res.send("info routes")
})

infoRouter.post('/', (req,res) => {
	console.log("request bidy from ", req.headers.host)
	console.log(req.body)
	storeFingerprintInfos(req.body)
	return res.send('some data was send to info ')
})



module.exports = infoRouter

