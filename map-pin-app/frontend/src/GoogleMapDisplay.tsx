import React from 'react';
import useGoogleMapsAPI from './useGoogleMapsAPI';

const GoogleMapDisplay = ({ addresses }: { addresses: string[] }) => {
  const isGoogleMapsLoaded = useGoogleMapsAPI('YOUR_GOOGLE_MAPS_API_KEY');

  if (!isGoogleMapsLoaded) {
    return <div>Loading...</div>;
  }

  // ここでGoogle Mapsのマップを初期化し、住所に基づいてルートを描画します。

  return <div id="map">ここにGoogle Mapが表示されます。</div>;
};

export default GoogleMapDisplay;
