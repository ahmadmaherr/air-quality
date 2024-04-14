const express = require('express');
const { getAirQuality, getMostPolluted } = require("../controllers/airQuality.controller");
const router = express.Router();

router.route('/mostPolluted').get(getMostPolluted);
router.route('/:lng/:lat').get(getAirQuality);

module.exports = router;
 
 