// Import the express module
const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors'); // Import cors module

// Create an instance of express
const app = express();

// Use cors middleware
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the root path ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Define a route for the API
app.get('/api/nearest', async (req, res) => {
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var nb = req.query.nb;
  var radius = req.query.radius;
  var population = req.query.population;
  var region = req.query.region;
  try {
    const response = await axios.get("http://localhost:8080/api/cities/nearest?latitude="+latitude+"&longitude="+longitude+"&nb="+nb+"&radius="+radius+"&population="+population+"&region="+region);
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while calling the external API');
  }
});

app.get('/api/regions', async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8080/api/cities/regions");
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while calling the external API');
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});