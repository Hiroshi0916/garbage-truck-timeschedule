import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

const MapDisplay = ({ position, onMapLoad, onMapClick }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <div className="App-map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={position}
        zoom={13}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        {/* ここに必要に応じて追加の地図機能やマーカーを追加できます */}
      </GoogleMap>
    </div>
  );
};

export default MapDisplay;
