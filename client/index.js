/*
  Ce fichier est le point d'entrée de l'application.
  Il utilise le module express pour créer un serveur web.
  Il utilise également le module axios pour appeler des API externes.
*/
const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

// Crée une application express
const app = express();

// Active CORS pour autoriser les requêtes depuis n'importe quelle origine
app.use(cors());

// Active le middleware pour parser le JSON
app.use(express.static('public'));

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Route pour afficher la documentation de l'API
app.get('/api-doc', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/api-doc.html'));
});

// Route pour récuperer les villes les plus proches
app.get('/api/nearest', async (req, res) => {
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var nb = req.query.nb;
  var radius = req.query.radius;
  var population = req.query.population;
  var region = req.query.region;
  try {
    const response = await axios.get("http://gogole-map-back:8080/api/cities/nearest?latitude="+latitude+"&longitude="+longitude+"&nb="+nb+"&radius="+radius+"&population="+population+"&region="+region);
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while calling the external API');
  }
});

// Route pour récuperer les régions
app.get('/api/regions', async (req, res) => {
  try {
    const response = await axios.get("http://gogole-map-back:8080/api/cities/regions");
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while calling the external API');
  }
});

// Démarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});