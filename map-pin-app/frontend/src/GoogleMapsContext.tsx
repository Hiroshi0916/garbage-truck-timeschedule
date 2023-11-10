import React, { createContext, useState, useContext, ReactNode } from 'react';

// Contextの型を定義
interface GoogleMapsAPIContextType {
    isLoaded: boolean;
    setIsLoaded: (isLoaded: boolean) => void;
  }
  const defaultContextValue: GoogleMapsAPIContextType = {
    isLoaded: false,
    setIsLoaded: () => {},
  };

// Contextの作成
const GoogleMapsAPIContext = createContext<GoogleMapsAPIContextType>(defaultContextValue);

// Providerコンポーネントの作成
export const GoogleMapsAPIProvider = ({ children }: { children: ReactNode }) => {
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
