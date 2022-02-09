const express = require('express')
const fingerprintService = require('./service')

const router = express.Router()

router.get('/', fingerprintService.getLastVisits)
router.post('/', fingerprintService.storeFingerprint)

module.exports = router