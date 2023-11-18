import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Direction from './Direction';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 42.755955,
  lng: 141.32816
};

export default function GoogleMapComponent() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Direction />
      </GoogleMap>
    </LoadScript>
  );
}
