import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/query/useWeather';
import { Flex, Text, Stack } from '@chakra-ui/react';
import {
  FilterWeatherText,
  handleImageKeyword,
} from '../utils/FilterWeatherText';
import PrimaryImage from './common/PrimaryImage';
import Loading from './common/Loading';

const Weather = () => {
  const location = useLocation();
  const { data } = useWeather(location.lat, location.lon);

  return (
    <>
      {data ? (
        <Flex
          w="100%"
          align="center"
          justify="space-between"
          bgColor="blue.800"
          p="0.5em 1.2em"
          borderRadius={20}
        >
          <Stack color="white">
            <Text as="b" fontSize="2xl">
              오늘은 {FilterWeatherText(data.weatherInfo.keyword)}
            </Text>
            <Text fontSize="sm" color="gray.400">
              우산 펼치기 얍
            </Text>
          </Stack>
          <PrimaryImage
            boxSize="120"
            imageSrc={handleImageKeyword(data.weatherInfo.keyword)}
          />
        </Flex>
      ) : (
        <Flex
          align="center"
          w="100%"
          p="20px"
          bgColor="blue.800"
          pos="relative"
          borderRadius={20}
        >
          <Text color="white" as="b">
            날씨 정보 불러오는 중...
          </Text>
          <Loading pos="absolute" top={6} right={6} size="sm" />
        </Flex>
      )}
    </>
  );
};

export default Weather;
