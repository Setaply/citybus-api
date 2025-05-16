const express = require('express');
const app = express();
const port = 3000;

// GET /test endpoint
app.get('/test', (req, res) => {
  console.log('GET request received on /test!');
  res.send('It works on /test!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/test`);
});
