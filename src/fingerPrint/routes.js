const express = require('express')
const service = require('./service')
const {fingerPrintReqSchema }= require('../utils/JSONSchema')
const { Validator } = require("express-json-validator-middleware");


const { validate } = new Validator();
const router = express.Router()

router.get('/', service.getLastVisits)
router.post('/', validate({ body: fingerPrintReqSchema}), service.storeFingerprint)
router.delete('/', service.deleteEntries)

module.exports = router