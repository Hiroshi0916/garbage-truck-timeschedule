import React, { useState, useCallback } from 'react';
import { DirectionsService, DirectionsRenderer, DirectionsResult, DirectionsStatus } from '@react-google-maps/api';

interface Location {
    lat: number;
    lng: number;
  }
  
  const origin: Location = { lat: 42.755955, lng: 141.32816 };
  const destination: Location = { lat: 45.299023, lng: 141.65308 };
  
  const transitPoints = [
    { location: { lat: 43.66406, lng: 142.85445 }, stopover: true },
    { location: { lat: 43.906742, lng: 144.79872 } },
    { location: { lat: 43.286533, lng: 143.18524 } },
  ];
  
export default function Direction() {
    const [currentDirection, setCurrentDirection] = useState<DirectionsResult | null>(null);
  
    const directionsCallback = useCallback((response: DirectionsResult | null, status: DirectionsStatus) => {
      if (status === 'OK' && response) {
        setCurrentDirection(response);
      } else {
        console.error(`Error fetching directions ${response}`);
      }
    }, []);

    return (
        <>
          <DirectionsService
            options={{
              origin,
              destination,
              travelMode: google.maps.TravelMode.DRIVING, // この行を更新
              optimizeWaypoints: true,
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