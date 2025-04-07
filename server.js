const express = require("express");
const axios = require("axios");
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());

// Homepage Route (Fixes "Cannot GET /" issue)
app.get("/", (req, res) => {
  res.send("Welcome to the Anime API! Go to /anime to see the data.");
});

// Fetch Top Anime from Jikan API
app.get("/anime", async (req, res) => {
  try {
    const response = await axios.get("https://api.allorigins.win/raw?url=https://api.jikan.moe/v4/top/anime");
    res.json(response.data);
  } catch (error) {
    console.error("Proxy fetch error:", error.message);
    res.status(500).send("Error fetching anime data via proxy");
  }
});


app.get("/trending", async (req, res) => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/top/anime");
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching trending anime");
  }
});

// Most Favorited Anime
app.get("/favorited", async (req, res) => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/top/anime?filter=favorite");
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching favorited anime");
  }
});


//  Fetch Anime by Genre
app.get("/genre", async (req, res) => {
  const genreId = req.query.id; // Get genre ID from URL query
  if (!genreId) return res.status(400).send("Genre ID is required!");

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching anime by genre");
  }
});

//  Fetch a Random Anime
app.get("/random", async (req, res) => {
  try {
    const response = await axios.get("https://api.allorigins.win/raw?url=https://api.jikan.moe/v4/top/anime");
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching random anime");
  }
});

//  Fetch Anime by Studio (Using Studio ID)
app.get("/studio", async (req, res) => {
  const studioId = req.query.id; // Get studio ID from query
  if (!studioId) return res.status(400).send("Studio ID is required!");

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?producers=${studioId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching anime by studio");
  }
});

//  Fetch Anime Trailer with Embed URL
app.get("/trailer", async (req, res) => {
  const animeId = req.query.id; // Get anime ID from query
  if (!animeId) return res.status(400).send("Anime ID is required!");

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
    const trailerData = response.data.data.trailer;
    
    if (!trailerData || !trailerData.embed_url) {
      return res.status(404).send("Trailer not available for this anime.");
    }

    res.json({ trailer: trailerData.embed_url });
  } catch (error) {
    res.status(500).send("Error fetching anime trailer");
  }
});


// Search Anime by Name (Adding Without Modifying Anything Else)
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send("Anime name is required!");
  
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching anime data");
  }
});

// Fetch Anime Details by ID (used in anime-detail.html)
app.get("/anime/:id", async (req, res) => {
  const animeId = req.params.id;
  if (!animeId) return res.status(400).send("Anime ID is required!");

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching anime details");
  }
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
