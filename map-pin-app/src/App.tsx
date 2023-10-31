// App.tsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '70%',
  height: '400px'
};

const defaultPosition = {
  lat: 35.6895, 
  lng: 139.6917
};

function App() {
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [position, setPosition] = useState<{lat: number, lng: number} | undefined>(defaultPosition);

    const handleSearch = () => {
        // ここで外部のAPIを使用して、住所や郵便番号から座標を取得し、setPositionでセットします。
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '30%' }}>
                <div>
                    <label>住所:</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label>郵便番号:</label>
                    <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </div>
                <button onClick={handleSearch}>検索</button>
            </div>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={position}
                    zoom={13}
                >
                    {/* You can add markers, polygons, etc. here */}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default App;
