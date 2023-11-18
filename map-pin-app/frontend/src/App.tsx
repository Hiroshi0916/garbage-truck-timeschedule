import React, { useCallback, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Navbar from "./Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminPage from "./AdminPage";
import { SearchForm } from "./SearchForm";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const defaultPosition = {
  lat: 35.681236,
  lng: 139.767125,
};

function App() {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [position, setPosition] = useState<
    { lat: number; lng: number } | undefined
  >(defaultPosition);

  const getCurrentLocation = useCallback(async () => {
    try {
      const response = await fetch("/current-location");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.location) {
        setPosition({ lat: data.location.lat, lng: data.location.lng });
        setLat(data.location.lat);
        setLng(data.location.lng);
      } else {
        console.error("Error fetching current location");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  // マップ読み込み時の処理
  const handleMapLoad = (map: any) => {
    console.log("Position:", position);

    console.log("Google Map is loaded!", map);
  };

  const handleMapClick = (e: any) => {
    console.log("Map clicked at:", e.latLng.toString());
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="App-layout">
                <SearchForm
                  onSearch={handleSearch}
                  onGetCurrentLocation={getCurrentLocation}
                />
              </div>
            }
          />

          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </LoadScript>
  );
}

export default App;

// import React from 'react';
// import GoogleMapComponent from './GoogleMapComponent';

// function App() {
//   return (
//     <div>
//       <GoogleMapComponent />
//     </div>
//   );
// }

// export default App;
