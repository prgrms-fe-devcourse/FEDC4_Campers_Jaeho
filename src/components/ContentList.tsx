import { SimpleGrid, Box, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const ContentList = ({
  contents,
}: {
  contents: { title: string; _id: string }[];
}) => {
  return (
    <SimpleGrid w="100%" columns={2} spacing={2}>
      {contents.map(({ title, _id }) => (
        <Box
          backgroundImage={'https://bit.ly/dan-abramov'}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          height="30vh"
          key={_id}
          position="relative"
          overflow="hidden"
          borderRadius="10px"
        >
          <Box
            position="relative"
            w="100%"
            h="100%"
            background="linear-gradient(
              180deg,
              rgba(2, 0, 36, 0) 0%,
              rgba(33, 33, 116, 0) 20%,
              rgba(0, 0, 0, 1) 100%
            )"
          >
            <Text position="absolute" bottom="50px" left="15px" color="grey">
              북한
            </Text>
            <Text
              position="absolute"
              bottom="15px"
              left="15px"
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
