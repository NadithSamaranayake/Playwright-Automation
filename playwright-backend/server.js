const express = require('express');
const cors = require('cors'); // To allow Angular to talk to it
const app = express();
const port = 3000;

app.use(cors()); // Enable all CORS requests
app.use(express.json()); // To parse JSON bodies

// Create one test "endpoint"
app.get('/api/ping', (req, res) => {
  console.log('Received a ping from Angular!');
  res.json({ message: 'Pong! The backend is working!' });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});