import rain from '../assets/images/rain.png';
import snow from '../assets/images/snow.png';
import warm from '../assets/images/warm.png';

export const FilterWeatherText = (keyword: string) => {
  const cloudText = '안개가 자욱~';
  const commonWeatherType = {
    Mist: cloudText,
    Smoke: cloudText,
    Haze: cloudText,
    Dust: cloudText,
    Fog: cloudText,
    Ash: cloudText,
    Clouds: cloudText,
  };

  const specificWeatherType = {
    Thunderstorm: '번개가 꽝꽝',
    Drizzle: '이슬비가 이슬이슬',
    Rain: '비가 주룩주룩',
    Snow: '눈이 소복소복',
    Sand: '황사가 휭휭',
    Squall: '돌풍이 훅훅',
    Tornado: '폭풍이 훅훅',
    Clear: '해가 쨍쨍',
  };

  const weatherType = { ...commonWeatherType, ...specificWeatherType };

  return weatherType[keyword] ?? '정보가 없습니다ㅠㅠ';
};

export const handleImageKeyword = (keyword: string) => {
  switch (keyword) {
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Ash':
    case 'Clouds':
    case 'Thunderstorm':
    case 'Drizzle':
    case 'Rain':
      return rain;

    case 'Snow':
      return snow;

    default:
      return warm;
  }
};
