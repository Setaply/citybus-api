const express = require('express');
const app = express();
const port = 3000;

// GET /test endpoint
app.get('/test', (req, res) => {
  console.log('GET request received on /test!');
  res.send('It works on /test!');
});

// Start the server on all interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/test`);
});
