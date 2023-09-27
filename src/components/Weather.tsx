import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/query/useWeather';
import { Flex, Box, Text, Stack } from '@chakra-ui/react';
import {
  FilterWeatherText,
  handleImageKeyword,
} from '../utils/FilterWeatherText';
import { GrLocation } from 'react-icons/gr';
import PrimaryImage from './common/PrimaryImage';

const Weather = () => {
  const location = useLocation();
  const { data, isLoading, isError } = useWeather(location.lat, location.lon);
  console.log(location);
  if (isLoading) return <Box>Loading...</Box>;

  if (isError) return <Box>Error...</Box>;

  return (
    <>
      <Flex
        align="center"
        background="gray.300"
        borderRadius="10"
        px="20px"
        mx="10px"
        h="150px"
      >
        <Stack flex={1} pos="relative">
          <Flex
            align="center"
            gap="5px"
            p="3px 7px"
            bgColor="white"
            fontSize="12px"
            flex={0}
            pos="absolute"
            borderRadius="20px"
            top="-30px"
          >
            <GrLocation />
            <Box>
              <Text> {data.name}</Text>
            </Box>
          </Flex>
          <Text fontWeight="bold" fontSize="26px">
            오늘은 {FilterWeatherText(data.weatherInfo.keyword)}
          </Text>
          <Text pos="absolute" bottom="-25px" fontSize="14px">
            우산 챙겨가세요~
          </Text>
        </Stack>
        <Box>
          <PrimaryImage
            imageSrc={handleImageKeyword(data.weatherInfo.keyword)}
          />
        </Box>
      </Flex>
    </>
  );
};

export default Weather;
