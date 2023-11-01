// App.tsx
import React, { useCallback, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

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
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

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
          onLoad={handleMapLoad} // 地図が読み込まれたときにhandleMapLoadが呼び出される
          onClick={handleMapClick} // 地図がクリックされたときにhandleMapClickが呼び出される
        >
          {/* 東京駅の上にマーカーを配置 */}
          <Marker position={tokyoStationPosition} />
          {position && <Marker position={position} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default App;
