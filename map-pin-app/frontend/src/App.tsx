import React, { useCallback } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Navbar from "./Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Direction from "./Direction";
import AdminPage from "./AdminPage";
import { SearchForm } from "./SearchForm";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const getCurrentLocation = useCallback(async () => {
    try {
      const response = await fetch("/current-location");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const handleSearch = async (address: string, postalCode: string) => {
    // ここで住所または郵便番号に基づいて検索処理を行い、結果を onSearch コールバックに渡す
    console.log("Sending address:", address);
    try {
      const response = await fetch(
        `${BASE_URL}/geocode?address=${address || postalCode}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        console.log(location);
      } else {
        console.error("Error fetching coordinates:", data.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // マップのスタイルと初期位置
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };
  const defaultPosition = { lat: 35.681236, lng: 139.767125 }; // 東京駅

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

                <GoogleMap
                   key={window.location.pathname} // ルートのパスをキーとして使用
                  mapContainerStyle={mapContainerStyle}
                  center={defaultPosition}
                  zoom={10}
                >
                  <Direction />
                </GoogleMap>
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
