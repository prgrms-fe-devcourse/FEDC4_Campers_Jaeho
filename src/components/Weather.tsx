import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/query/useWeather';
import { Flex, Box, Text } from '@chakra-ui/react';
import {
  FilterWeatherText,
  handleImageKeyword,
} from '../utils/FilterWeatherText';
import { GrLocation } from 'react-icons/gr';
import PrimaryImage from './common/PrimaryImage';

const Weather = () => {
  const location = useLocation();
  const { data, isLoading, isError } = useWeather(location.lat, location.lon);

  if (isLoading) return <Box>Loading...</Box>;

  if (isError) return <Box>Error...</Box>;

  return (
    <>
      <Flex align="center" background="gray.300" borderRadius="10" px="3">
        <Box flex={1}>
          <Flex align="center" borderRadius="5" background="white">
            <GrLocation style={{ width: '15px' }} />
            <Text as="b">{data.name}</Text>
          </Flex>
          <Text>오늘은 {FilterWeatherText(data.weatherInfo.keyword)}</Text>
        </Box>
        <Box flex="1">
          <PrimaryImage
            imageSrc={handleImageKeyword(data.weatherInfo.keyword)}
          />
        </Box>
      </Flex>
    </>
  );
};

export default Weather;
