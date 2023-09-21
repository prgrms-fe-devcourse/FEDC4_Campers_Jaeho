import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Content } from './Main/MainPageContent';
import { SimpleGrid, Box, Text, AspectRatio } from '@chakra-ui/react';

type ContentListProps = {
  contents: Content[];
  spacing?: number;
  borderRadius?: string;
  width?: string;
  minH?: string;
};

const ContentList = ({
  contents,
  spacing = 2,
  borderRadius = '10',
  width = '100%',
  minH = '34vh',
  ...props
}: ContentListProps) => {
  return (
    <SimpleGrid
      w={width}
      columns={{ base: 2, md: 3 }}
      spacing={spacing}
      {...props}
    >
      {contents.map(({ title, _id, image }) => (
        <AspectRatio
          bgImg={image || '../src/assets/images/no_image.png'}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          minH={minH}
          key={_id}
          pos="relative"
          overflow="hidden"
          borderRadius={borderRadius}
          ratio={1 / 1}
        >
          <Box
            pos="relative"
            w="100%"
            h="100%"
            bg="linear-gradient(
              180deg,
              rgba(2, 0, 36, 0) 0%,
              rgba(33, 33, 116, 0) 40%,
              rgba(0, 0, 0, 1) 100%
            )"
          >
            <Text pos="absolute" bottom="50" left="15" color="#D3DCDE">
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
        </AspectRatio>
      ))}
    </SimpleGrid>
  );
};

export default ContentList;
