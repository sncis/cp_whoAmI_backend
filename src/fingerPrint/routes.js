const express = require('express')
const fingerprintService = require('./service')

const router = express.Router()

router.get('/', fingerprintService.getLastVisits)
router.post('/', fingerprintService.storeFingerprint)
router.delete('/', fingerprintService.deleteEntries)

module.exports = router