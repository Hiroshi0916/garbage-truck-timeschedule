import React, { useState, useCallback } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

export default function Direction() {
  const origin = { lat: 35.681236, lng: 139.767125 }; // 東京駅
  const destination = { lat: 35.658581, lng: 139.745433 }; // 東京タワー近く（目的地として設定）

  const transitPoints = [
    { location: { lat: 35.690921, lng: 139.700258 }, stopover: true }, // 新宿駅
    { location: { lat: 35.699693, lng: 139.70622 }, stopover: true }, // 渋谷駅
    { location: { lat: 35.713768, lng: 139.777254 }, stopover: true }, // 上野駅
    { location: { lat: 35.707438, lng: 139.663835 }, stopover: true }, // 品川駅
    { location: { lat: 35.728926, lng: 139.71038 }, stopover: true }, // 池袋駅
    { location: { lat: 35.689634, lng: 139.692101 }, stopover: true }, // 新大久保駅
    { location: { lat: 35.6895, lng: 139.691706 }, stopover: true }, // 大久保駅
    { location: { lat: 35.699855, lng: 139.77235 }, stopover: true }, // 御徒町駅
    { location: { lat: 35.698683, lng: 139.773619 }, stopover: true }, // 上野広小路駅
    { location: { lat: 35.706646, lng: 139.756749 }, stopover: true }, // 御成門駅
  ];

  const [currentDirection, setCurrentDirection] = useState<google.maps.DirectionsResult | null>(null);

  const directionsCallback = useCallback((response: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
    if (response !== null) {
        if (status === google.maps.DirectionsStatus.OK && response) {
        setCurrentDirection(response);
      } else {
        console.error("Directions request failed due to " + status);
      }
    }
  }, []);

  return (
    <>
      <DirectionsService
        options={{
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: transitPoints,
        }}
        callback={directionsCallback}
      />
      {currentDirection && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
          }}
        />
      )}
    </>
  );
}