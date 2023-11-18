import React, { useState } from "react";

interface SearchFormProps {
    onSearch: (address: string, postalCode: string) => void;
    onGetCurrentLocation: () => void;
  }

  export function SearchForm({ onSearch, onGetCurrentLocation }: SearchFormProps) {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSearchClick = () => {
    onSearch(address, postalCode); // App から渡された onSearch を呼び出す
  };

  return (
    <div className="App-search-container">
      <div className="App-input-group">
      <label htmlFor="address">住所:</label>
        <input
          className="App-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="App-input-group">
      <label htmlFor="postalCode">郵便番号:</label>
        <input
          className="App-input"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <button className="App-button" onClick={handleSearchClick}>
        検索
      </button>
      <button className="App-button" onClick={onGetCurrentLocation}>
        現在地を取得
      </button>

    </div>
  );
}
