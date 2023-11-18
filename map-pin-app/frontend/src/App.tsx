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



  const handleSearch = async (address: string, postalCode: string) => {
    // ここで住所または郵便番号に基づいて検索処理を行い、結果を onSearch コールバックに渡す
    console.log("Sending address:", address);
    try {
      const response = await fetch(`${BASE_URL}/geocode?address=${address || postalCode}`, {
        method: "GET", 
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        console.log(location);
        setPosition({ lat: location.lat, lng: location.lng });
        setLat(location.lat);
        setLng(location.lng);
      } else {
        console.error("Error fetching coordinates:", data.status);
      }

    } catch (error) {
      console.error("Error:", error);
    }
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
