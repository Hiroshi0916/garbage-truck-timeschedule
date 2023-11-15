import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

import Navbar from "./Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistration from "./UserRegistration";
import AdminPage from "./AdminPage";
import UserProfile from "./UserProfile";
import UserEditForm from "./UserEditForm";
import { AddressInfo } from "./types";

// DirectionsResult は google.maps 名前空間からインポート
type DirectionsResult = google.maps.DirectionsResult;

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
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);

  const [directionsResponse, setDirectionsResponse] =
    useState<DirectionsResult | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

const lastAddress = addresses[addresses.length - 1];

if (lastAddress.latitude !== undefined && lastAddress.longitude !== undefined) {
  const destination = new google.maps.LatLng(lastAddress.latitude, lastAddress.longitude);
} 


const directionsServiceOptions = {
  origin: currentLocation,
  destination: destination,
  waypoints: waypoints,
  travelMode: google.maps.TravelMode.DRIVING,
};


  // 住所のリストを更新する関数（例えば、APIから取得したり、ユーザーの入力に基づいて更新したりする）
const updateAddresses = (newAddresses: AddressInfo[]) => {
  setAddresses(newAddresses);
};

  // 現在地を取得するロジック（例えば、ブラウザの Geolocation APIを使用）
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Error getting the location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

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

  const calculateRoute = async () => {
    if (!currentLocation || addresses.length === 0) return;

    const waypoints = addresses.map((addr: AddressInfo) => {
      if (addr.latitude === undefined || addr.longitude === undefined) {
        // ここでエラーを処理するか、適切なフォールバックを提供する
      }
      return {
        location: new google.maps.LatLng(addr.latitude, addr.longitude),
        stopover: true,
      };
    });
    

    const directionsServiceOptions = {
      origin: currentLocation,
      destination: addresses[addresses.length - 1], // 最後の住所を目的地とする
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(directionsServiceOptions, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        setDirectionsResponse(result);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  };

  // DirectionsRenderer コンポーネントの追加
  const renderDirections = () => {
    if (directionsResponse) {
      return (
        <DirectionsRenderer
          options={{
            directions: directionsResponse,
          }}
        />
      );
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
                    {renderDirections()}
                  </GoogleMap>
                </div>
              </div>
            }
          />

          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/edit" element={<UserEditForm />} />
        </Routes>
      </Router>
    </LoadScript>
  );
}

export default App;
