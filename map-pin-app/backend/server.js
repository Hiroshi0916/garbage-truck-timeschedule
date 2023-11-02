const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
require('dotenv').config();
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const fetch = require('node-fetch');


app.use(cors());



app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



app.get('/geocode', async (req, res) => {
    console.log("TEST");
    const addressOrPostalCode = req.query.address || req.query.postalCode;
    
    // ここでフロントエンドから送られてきた住所や郵便番号をログに表示します
    console.log("Received address or postal code:", addressOrPostalCode);
    
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressOrPostalCode}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();

    // ここでGoogle Geocoding APIから取得したデータをログとして表示します
    console.log("Geocoding data:", data);

    res.json(data);
});


app.get('/current-location', async (req, res) => {
    try {
        console.log("Received request for /current-location");
        // Google Maps Geolocation APIを使用して現在地を取得します
        const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`, {
            method: 'POST'
        });
        const data = await response.json();
                    // ここでデータをログとして表示します
    console.log("Geocoding data:", data);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use(cors());