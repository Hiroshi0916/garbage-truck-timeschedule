import { useState, useEffect } from 'react';

// 以下の部分でwindowオブジェクトの型を拡張
declare global {
  interface Window {
    initGoogleMapsAPILoaded?: () => void | undefined;
  }
}

function useGoogleMapsAPI(apiKey: string) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMapsAPILoaded`;
    script.async = true;
    script.defer = true;
    window.initGoogleMapsAPILoaded = () => setIsLoaded(true);
    const existingScript = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js?key="]`);
    if (!existingScript) {
      document.body.appendChild(script);
    }

    return () => {
      document.body.removeChild(script);
      window.initGoogleMapsAPILoaded = undefined; 
    };
  }, [apiKey]);

  return isLoaded;
}

export default useGoogleMapsAPI;