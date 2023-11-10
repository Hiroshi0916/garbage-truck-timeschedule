import React, { createContext, useState, useContext } from 'react';

// Contextの作成
const GoogleMapsAPIContext = createContext();

// Providerコンポーネントの作成
export const GoogleMapsAPIProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <GoogleMapsAPIContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </GoogleMapsAPIContext.Provider>
  );
};

// Contextを使用するためのカスタムフック
export const useGoogleMapsAPI = () => {
  return useContext(GoogleMapsAPIContext);
};
