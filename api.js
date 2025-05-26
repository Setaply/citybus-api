const express = require("express");
const cors = require("cors");
const api = express();

api.use(cors()); 

let longitude = 0;
let latitude = 0;

api.use(express.json());

api.get('/get-gps', async (req, res) => {
  res.json({ longitude, latitude });
});

api.post('/post-gps', async (req, res) => {
  const lon = parseFloat(req.query.longitude);
  const lat = parseFloat(req.query.latitude);
  if (!isNaN(lon)) longitude = lon;
  if (!isNaN(lat)) latitude = lat;
  res.json({ status: "GPS data updated" });
});

api.listen(3000, () => {
  console.log("Server running on port 3000");
});
