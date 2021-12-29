const express = require('express');
const router = express.Router();
const controller = require('../controllers/weather-controller');
const { query } = require('express-validator');

router.get('/currentWeather', [
  query('city', 'City cannot be empty').notEmpty(),
  query('stateCode', 'stateCode must be number').isNumeric().optional(),
  query('countryCode', 'countryCode must be number').isNumeric().optional(),
], controller.getCurrentWeather);

module.exports = router;