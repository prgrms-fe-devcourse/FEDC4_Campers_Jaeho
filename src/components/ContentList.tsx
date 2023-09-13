import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

type contents = { title: string; _id: string }[];

const ContentList = ({ contents }: { contents: contents }) => {
  return (
    <SimpleGrid w="100%" columns={2} spacing={2}>
      {contents.map(({ title, _id }) => (
        <Box
          bgImg={'https://bit.ly/dan-abramov'}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          h="30vh"
          key={_id}
          pos="relative"
          overflow="hidden"
          borderRadius="10"
        >
          <Box
            pos="relative"
            w="100%"
            h="100%"
            bg="linear-gradient(
              180deg,
              rgba(2, 0, 36, 0) 0%,
              rgba(33, 33, 116, 0) 20%,
              rgba(0, 0, 0, 1) 100%
            )"
          >
            <Text pos="absolute" bottom="50" left="15" color="grey">
              북한
            </Text>
            <Text
              pos="absolute"
              bottom="15"
              left="15"
              color="white"
              fontSize="xl"
            >
              {title}
            </Text>
            <Link
              to={`${ROUTES.USER_PROFILE}${_id}`} // 임시로 테스트를 위해 적은 url 이여서 수정이 필요합니다
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ContentList;
