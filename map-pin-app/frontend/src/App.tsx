import React, { useCallback,  useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Navbar from "./Navbar";

const containerStyle = {
  width: "100%", // 地図コンテナを親要素の100%の幅にする
  height: "400px",
};
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const defaultPosition = {
  lat: 35.681236,
  lng: 139.767125,
};


function App() {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [position, setPosition] = useState<
    { lat: number; lng: number } | undefined
  >(defaultPosition);

  console.log(
    "Google Maps API Key:",
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  );

  const handleSearch = async () => {
    console.log("Sending address:", address);
    try {
      // const response = await fetch(`/geocode?address=${address || postalCode}`);
      const response = await fetch(`${BASE_URL}/geocode?address=${address || postalCode}`);

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

  // 現在地を取得する関数
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

  const handleMapLoad = (map: any) => {
    console.log("Position:", position);

    console.log("Google Map is loaded!", map);
  };

  const handleMapClick = (e: any) => {
    console.log("Map clicked at:", e.latLng.toString());
  };

  return (
    <div>
      <Navbar /> {/* Navbar コンポーネントを挿入 */}
      <div style={{ display: "flex" }}>





    <div style={{ display: "flex" }}>
      <div style={{ width: "30%" }}>
        <div>
          <label>住所:</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>郵便番号:</label>
          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        {/* 現在地を取得するボタンを追加 */}
        <button onClick={getCurrentLocation}>現在地を取得</button>
        <button onClick={handleSearch}>検索</button>
        <div>
          緯度: {lat ? lat.toFixed(6) : "N/A"}
          <br />
          経度: {lng ? lng.toFixed(6) : "N/A"}
        </div>
      </div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={13}
          onLoad={handleMapLoad}
          onClick={handleMapClick}
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      </LoadScript>
    </div>

    </div>
      </div>
  );
}

export default App;
