const express = require('express')
const fingerprintService = require('./service')
const {fingerPrintReqSchema }= require('../JSONSchema')
const { Validator } = require("express-json-validator-middleware");

const { validate } = new Validator();
const router = express.Router()

router.get('/', fingerprintService.getLastVisits)
router.post('/', validate({ body: fingerPrintReqSchema}), fingerprintService.storeFingerprint)
router.delete('/', fingerprintService.deleteEntries)

module.exports = router