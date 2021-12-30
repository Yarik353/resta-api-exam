const axios = require('axios');
const config = require('../config');
const City = require('../models/City');
const Weather = require('../models/Weather');
const { ObjectId } = require('mongoose');


class WeatherService {
  async getCurrentWeather(cityName) {

    const existingCity = await City.findOne({ name: cityName });

    if (!existingCity) {
      const newCity = new City({ name: cityName });

      const forecast = await this.getWeather(cityName);
      const weather = new Weather({ forecast, city: newCity._id, queryTime: Date.now() });
      newCity.weather.push(weather._id);

      await newCity.save();
      await weather.save();

      return forecast;
    }

    const forecasts = await Weather.find({ city: existingCity._id }).sort({ queryTime: -1 });
    const latestForecast = forecasts[0];

    if (this._diffHours(latestForecast.queryTime, new Date()) <= 2) {
      return latestForecast.forecast;
    }

    const forecast = await this.getWeather(cityName);
    const weather = new Weather({ forecast, city: existingCity._id, queryTime: Date.now() });
    existingCity.weather.push(weather._id);

    await existingCity.save();
    await weather.save();

    return forecast;
  }

  _diffHours(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  async getWeather(cityName) {
    const requestUrl = encodeURI(`https://${config.WEATHER_API_URL}?q=${cityName}&appid=${config.WEATHER_API_KEY}&units=metric`);

    const response = await axios({
      method: 'get',
      url: requestUrl,
    });

    const { data: responseData } = response;

    return responseData;
  }
}

module.exports = new WeatherService();