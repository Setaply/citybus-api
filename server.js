// Imports //
const express = require("express");

// Vars // 
const api = express();

// Init //
//api.use(express.json());

// Listeners //
api.get('/gps', (req, res) => {
  res.status(200);
  console.log("YESSSSSIIRRR")
})
let server = api.listen(3000, () => {
  console.log("Server running on port 3000");
});
