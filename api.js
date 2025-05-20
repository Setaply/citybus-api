// Imports //
const express = require("express");

// Vars // 
const api = express();

// Init //
api.use(express.json());


// Handlers
async function handler_getGPS(req, res) {
  if (req) return res.status(400).json({ error: "Invalid request" });
  body.domain = htmlquery.ensureHttps(body.domain)
 
  console.log("get request gotten")
}

async function handler_postGPS(req, res) {
  let body = req.body || {}
  console.log(body)
  //if (body.long == null || body.key != apiKey) return res.status(400).json({ error: "Invalid request" });
  //body.domain = htmlquery.ensureHttps(body.domain)

  console.log("post request gotten")


  //// Return
  //res.json(result);
}

// Listeners //
api.get('/get-gps', handler_getGPS)
api.post('/post-gps', handler_postGPS)
let server = api.listen(3000, () => {
  console.log("Server running on port 3000");
});
