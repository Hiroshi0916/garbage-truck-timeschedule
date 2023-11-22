import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Navbar from "./Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Direction from "./Direction";
import AdminPage from "./AdminPage";
import { SearchForm } from "./SearchForm";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const [googleMap, setGoogleMap] = useState<GoogleMap | null>(null);

const googleMapRef = useRef<google.maps.Map>();

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


  const googleMapRef = useRef<google.maps.Map | undefined>(); // 型を undefined に変更

  const onGoogleMapMounted = useCallback((map: google.maps.Map) => {
    googleMapRef.current = map;
  }, []);


  const onGoogleMapUnmounted = useCallback(() => {
    googleMapRef.current = undefined; // null の代わりに undefined を使用
    setGoogleMap(null); // ステートをクリア
  }, []);

  useEffect(() => {
    const onGoogleMapMounted = (map) => {
      googleMapRef.current = map;
    };

    // GoogleMap コンポーネントがアンマウントされたら、DirectionsRenderer コンポーネントをレンダリングしない
    const onGoogleMapUnmounted = () => {
      googleMapRef.current = null;
    };

    googleMapRef.current = new GoogleMap({
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      mapContainerStyle,
      center: defaultPosition,
      zoom: 10,
    });

    googleMapRef.current.on("mount", onGoogleMapMounted);
    googleMapRef.current.on("unmount", onGoogleMapUnmounted);
    return () => {
      googleMapRef.current.off("mount", onGoogleMapMounted);
      googleMapRef.current.off("unmount", onGoogleMapUnmounted);
    };
  }, [defaultPosition, mapContainerStyle]); // Include dependencies

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
      <Router>
        {/* 省略された他のコンポーネント... */}
        <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultPosition}
      zoom={10}
      onLoad={onGoogleMapMounted}
      onUnmount={onGoogleMapUnmounted}
    >
             <Direction googleMap={googleMapRef.current} /> 
        </GoogleMap>
      </Router>
    </LoadScript>
  );
}

export default App;
