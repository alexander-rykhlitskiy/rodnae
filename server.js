'use strict';

const express = require('express');
const request = require('request');

// Constants
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/', (req, res) => {
  var key = process.env.PLACE_API_KEY;
  var area = req['query']['area'] || 'лидский район';
  var query = encodeURIComponent(`${area} достопримечательности`);

  var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&language=ru&key=${key}`;

  request(url, function (error, response, body) {
    var places = JSON.parse(body)['results'].map((place) => {
      return { name: place['name'], address: place['formatted_address'] }
    })

    res.render('index', { places: places, area: area });
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
