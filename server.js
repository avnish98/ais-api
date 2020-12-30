const express = require('express');
const path = require('path');

const api = require('./api');
const areaApi = require('./area');

function init() {
  const app = express();

  app.set('port', (process.env.PORT || 5000))

  app.get('/ais-api', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'));
  });

  app.get('/ais-api/getLastPositionFromVF/:mmsi', (req, res) => {
    api.getLocationFromVF(req.params.mmsi, (result) => {
      res.send(result);
    });
  });

  app.get('/ais-api/getLastPositionFromMT/:mmsi', (req, res) => {
    api.getLocationFromMT(req.params.mmsi, (result) => {
      res.send(result);
    });
  });

  app.get('/ais-api/getLastPosition/:mmsi', (req, res) => {
    api.getLocation(req.params.mmsi, (result) => {
      res.send(result);
    });
  });

  // e.g. /getVesselsInArea/WMED,EMED
  app.get('/ais-api/getVesselsInArea/:area', async (req, res) => {
    const result = await areaApi.fetchVesselsInArea(req.params.area.split(','), (result) => {
      res.json(result);
    });
  });

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
}

module.exports = {
  init: init,
};
