import React, { useState } from "react";

export function SearchForm({ onSearch, onGetCurrentLocation }) {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSearch = async () => {
    // ここで住所または郵便番号に基づいて検索処理を行い、結果を onSearch コールバックに渡す
    console.log("Sending address:", address);
    try {
      const response = await fetch(`${BASE_URL}/geocode?address=${address || postalCode}`, {
        method: "GET", 
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        console.log(location);
        onSearch(location.lat, location.lng); // 緯度と経度を onSearch に渡す
      } else {
        console.error("Error fetching coordinates:", data.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
      <button className="App-button" onClick={onGetCurrentLocation}>
        検索
      </button>
    </div>
  );
}
