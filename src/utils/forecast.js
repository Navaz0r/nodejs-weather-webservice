/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const request = require('request');

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4450b4d340d7bd9072862f60faff21ea&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error !== undefined && body.error.code === 601) {
      callback('Unable to find location!', undefined);
    } else if (body.error !== undefined && body.error.code === 615) {
      callback('API request failed. Please try again or contact support.', undefined);
    } else {
      callback(undefined, `Currently the weather is ${body.current.weather_descriptions[0]} and the temperature is ${body.current.temperature} degree, it feels like ${body.current.feelslike} degree.`);
    }
  });
};

module.exports = forecast;
