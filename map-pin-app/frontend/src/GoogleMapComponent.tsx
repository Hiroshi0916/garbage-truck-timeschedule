import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Direction from './Direction';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 35.689487, // 東京の中心部の緯度
  lng: 139.691706 // 東京の中心部の経度
};


export default function GoogleMapComponent() {

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10} // 東京の経由地点が全て見えるようにズームレベルを調整
      >
        <Direction />
      </GoogleMap>
    </LoadScript>
  );
}
