// Imports //
const express = require("express");

// Vars // 
const api = express();

// Data //
let longitude = 0;
let latitude = 0;

// Init //
api.use(express.json());

// Handlers
async function handler_getGPS(req, res) {
  let gpsData = {
    longitude : longitude,
    latitude : latitude
  }

  res.json(gpsData)
}

async function handler_postGPS(req, res) {
  let body = req.body || {}
  console.log(body)
  console.log("post request gotten")

  if (typeof body.longitude === 'number') {
    longitude = body.longitude
  }

  if (typeof body.latitude === 'number') {
    latitude = body.latitude
  }

  res.json({ status: "GPS data updated" })
}

// Listeners //
api.get('/get-gps', handler_getGPS)
api.post('/post-gps', handler_postGPS)
let server = api.listen(3000, () => {
  console.log("Server running on port 3000");
});
