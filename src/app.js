/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const server = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
server.set('view engine', 'hbs');
server.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
server.use(express.static(publicDirectoryPath));

server.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Navarin',
  });
});

server.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Navarin',
  });
});

server.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Navarin',
    helpText: 'This some awesome text.',
  });
});

server.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Address must be provided.' });
  }

  const { address } = req.query;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({ forecastError });
      }

      res.send({
        temprature: forecastData.temprature,
        feelslike: forecastData.feelslike,
        icon: forecastData.icon,
        result: forecastData.result,
        location,
        address,
      });
    });
  });
});

server.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'Navarin',
    errMsg: 'Help article not found.',
  });
});

server.get('*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'Navarin',
    errMsg: 'Page not found.',
  });
});

server.listen(port, () => {
  console.log('Server is up on port 3000.');
});
