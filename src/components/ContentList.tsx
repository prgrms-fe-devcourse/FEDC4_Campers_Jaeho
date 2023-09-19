import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Content } from './Main/MainPageContent';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';

type ContentListProps = {
  contents: Content[];
  spacing?: number;
  borderRadius?: string;
  width?: string;
  gridColumns?: { base?: number; md?: number };
};

const ContentList = ({
  contents,
  spacing = 2,
  borderRadius = '10',
  width = '100%',
  gridColumns = { base: 2, md: 3 },
}: ContentListProps) => {
  return (
    <SimpleGrid w={width} columns={gridColumns} spacing={spacing}>
      {contents.map(({ title, _id, image }) => (
        <Box
          bgImg={image || 'https://via.placeholder.com/150'}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          minH="30vh"
          key={_id}
          pos="relative"
          overflow="hidden"
          borderRadius={borderRadius}
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
              overflow="hidden"
              maxW="90%"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {title}
            </Text>
            <Link
              to={`${ROUTES.DETAIL.replace(':postId', _id)}`}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ContentList;
