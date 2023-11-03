const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
require("dotenv").config();
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const fetch = require("node-fetch");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/geocode", async (req, res) => {
  const address = req.query.address;
  const postalCode = req.query.postalCode;

  if (address) {
    console.log("Received address:", address);
  }
  if (postalCode) {
    console.log("Received postal code:", postalCode);
  }

  const locationQuery = address || postalCode || "";

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${locationQuery}&key=${GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();

  console.log("Geocoding data:", data);

  res.json(data);
});

app.get("/current-location", async (req, res) => {
  try {
    console.log("Received request for /current-location");

    const response = await fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`,
        {
          method: "POST",
        }
      );
    const data = await response.json();
    console.log("Geocoding data:", data);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

