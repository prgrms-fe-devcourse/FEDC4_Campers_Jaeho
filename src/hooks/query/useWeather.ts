import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../../apis/weather';

export const useWeather = (lat: number, lon: number) => {
  const getWeatherInfo = useQuery(['weather'], () => getWeather(lat, lon), {
    enabled: !!lat,
    staleTime: 1000 * 60 * 5,
  });

  return getWeatherInfo;
};
