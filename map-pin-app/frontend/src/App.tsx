import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import Navbar from "./Navbar";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import UserRegistration from "./UserRegistration";
import AdminPage from "./AdminPage";
import UserProfile from "./UserProfile"; 
import UserEditForm from "./UserEditForm";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const defaultPosition = {
  lat: 35.681236,
  lng: 139.767125,
};

// Markerの型定義（TypeScriptの場合）
type MarkerType = {
  latitude: number;
  longitude: number;
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

  const [markers, setMarkers] = useState<MarkerType[]>([]);


  useEffect(() => {
    // localStorage からアドレスデータを読み込む
    const savedAddresses = JSON.parse(localStorage.getItem("addresses") || "[]");
    setMarkers(savedAddresses);
  }, []);


  const handleSearch = async () => {
    console.log("Sending address:", address);
    try {
      const response = await fetch(
        `${BASE_URL}/geocode?address=${address || postalCode}`,
        {
          method: "GET", // GETリクエストでバックエンドに送信
        }
      );

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


  // マーカーをレンダリングする関数
  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <Marker key={index} position={{ lat: marker.latitude, lng: marker.longitude }} />
    ));
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
              <div className="App-search-container">
                <div className="App-input-group">
                  <label>住所:</label>
                  <input
                    className="App-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="App-input-group">
                  <label>郵便番号:</label>
                  <input
                    className="App-input"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <button className="App-button" onClick={getCurrentLocation}>
                  現在地を取得
                </button>
                <button className="App-button" onClick={handleSearch}>
                  検索
                </button>
                <div className="App-coordinates">
                  緯度: {lat ? lat.toFixed(6) : "N/A"}
                  <br />
                  経度: {lng ? lng.toFixed(6) : "N/A"}
                </div>
              </div>

              <div className="App-map-container">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={position}
                    zoom={13}
                    onLoad={handleMapLoad}
                    onClick={handleMapClick}
                  >
                 {renderMarkers()}
                  </GoogleMap>
              </div>
            </div>
          }
        />

        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/admin" element={<AdminPage />} /> 
        <Route path="/user/profile" element={<UserProfile/>}/> 
        <Route path="/user/edit" element={<UserEditForm/>}/>
      </Routes>
    </Router>
    </LoadScript>
  );
}

export default App;
