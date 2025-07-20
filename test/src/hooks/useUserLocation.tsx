import { useEffect, useState } from 'react';
import { getUserLocation } from '@/api/locationApi';

const useUserLocation = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getLocation = async () => {
      setLoading(true);
      try {
        const location = await getUserLocation();
        if (typeof location === 'string') {
          setLocation(location);
        } else {
          setError(location.error);
        }
      } catch {
        setError('Error retrieving location');
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return { location, error, loading, setLocation ,setError };
};

export default useUserLocation;
