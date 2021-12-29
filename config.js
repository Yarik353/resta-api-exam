require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  WEATHER_API_URL: 'api.openweathermap.org/data/2.5/weather',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
};
