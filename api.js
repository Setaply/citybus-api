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
  console.log("get request gotten")
  let gpsData = {
    longitude : longitude,
    latitude : latitude
  }

  res.json(gpsData)
}   

async function handler_postGPS(req, res) {
  const lon = parseFloat(req.query.longitude);
  const lat = parseFloat(req.query.latitude);

  console.log(req.query);
  console.log("post request gotten");

  if (!isNaN(lon)) {
    longitude = lon;
  }

  if (!isNaN(lat)) {
    latitude = lat;
  }

  res.json({ status: "GPS data updated" });
}

// Listeners //
api.get('/get-gps', handler_getGPS)
api.post('/post-gps', handler_postGPS)
let server = api.listen(3000, () => {
  console.log("Server running on port 3000");
});
