import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error occurred: ', error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return location;
};
