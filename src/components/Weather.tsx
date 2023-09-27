import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/query/useWeather';
import {
  Flex,
  Box,
  Text,
  Stack,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FilterWeatherText,
  handleImageKeyword,
} from '../utils/FilterWeatherText';
import { GrLocation } from 'react-icons/gr';
import PrimaryImage from './common/PrimaryImage';
import Loading from './common/Loading';

const Weather = () => {
  const location = useLocation();
  const { data, isLoading, isError } = useWeather(location.lat, location.lon);
  const textColor = useColorModeValue('black', '#2D3748');

  if (isError) return <Box>Error...</Box>;

  return (
    <>
      <Flex
        align="center"
        background="gray.300"
        borderRadius="10"
        px="20px"
        mx="10px"
        maxH="150px"
      >
        {isLoading ? (
          <Center p="20px" w="100%">
            <Loading />
          </Center>
        ) : (
          <>
            {' '}
            <Stack flex={1} pos="relative" justify="center">
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
                  <Text color={textColor}> {data.name}</Text>
                </Box>
              </Flex>
              <Text fontWeight="bold" fontSize="24px">
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
          </>
        )}
      </Flex>
    </>
  );
};

export default Weather;
