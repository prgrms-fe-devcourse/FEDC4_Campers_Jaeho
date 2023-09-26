import axios from 'axios';

export const getWeather = async (lat: number, lon: number) => {
  const {
    data: {
      main: { temp: temp },
      weather,
      name,
    },
  } = await axios({
    method: 'get',
    url: `${
      import.meta.env.VITE_WEATHER_URL
    }?lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_ID
    }`,
  });

  const weatherInfo = {
    keyword: weather[0].main,
    description: weather[0].description,
    icon: weather[0].icon,
  };

  return { temp, weatherInfo, name };
};
