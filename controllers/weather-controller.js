const { validationResult } = require('express-validator');
const weatherService = require('../services/weather-service');


class weatherController {
  async getCurrentWeather(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) res.status(400).json({ message: 'Bad params', ...errors });

      const { city: cityName, stateCode, countryCode } = req.query;

      const currentWeather = await weatherService.getCurrentWeather({ cityName, stateCode, countryCode });

      return res.json(currentWeather);
    } catch (e) {
      console.log(e.message);

      return e.isAxiosError ?
        res.status(e.response.status).json({ message: e.response.data.message }) :
        res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new weatherController();