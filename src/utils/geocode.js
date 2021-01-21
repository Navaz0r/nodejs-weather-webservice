/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmF2YXJpbiIsImEiOiJja2sxeWl2YzEwdnZyMnNtZjZvdzRjYjNuIn0.rhRlSvDr3g1_Ct7vvzxiGw&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to map box gecoding service.', undefined);
    } else if (body.message === 'Not Found') {
      callback('Location not found.', undefined);
    } else if (body.message === 'Not Authorized - No Token') {
      callback('Not authorized to view the API.', undefined);
    } else if (body.features.length === 0) {
      callback('Unvalid location, please try to enter it again.', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
