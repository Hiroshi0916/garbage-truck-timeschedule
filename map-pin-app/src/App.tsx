// App.tsx
import React, { useState } from "react";
import { GoogleMap, LoadScript,Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "70%",
  height: "400px",
};

const tokyoStationPosition = {
  lat: 35.681236,
  lng: 139.767125,
};

const defaultPosition = {
  lat: 35.6895,
  lng: 139.6917,
};

function App() {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [position, setPosition] = useState<
    { lat: number; lng: number } | undefined
  >(defaultPosition);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          address || postalCode
        }&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setPosition({ lat: location.lat, lng: location.lng });
      } else {
        console.error("Error fetching coordinates:", data.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleMapLoad = (map: any) => {
    console.log("Google Map is loaded!", map);
  };

  const handleMapClick = (e: any) => {
    console.log("Map clicked at:", e.latLng.toString());
  };

  return (
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
        <button onClick={handleSearch}>検索</button>
      </div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
      >
        {/* <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={13}
        > */}
                <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={13}
          onLoad={handleMapLoad}  // 地図が読み込まれたときにhandleMapLoadが呼び出される
          onClick={handleMapClick}  // 地図がクリックされたときにhandleMapClickが呼び出される
        >
          {/* 東京駅の上にマーカーを配置 */}
          <Marker position={tokyoStationPosition} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default App;
