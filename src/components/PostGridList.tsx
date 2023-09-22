import { ROUTES } from '../constants/routes';
import { SimpleGrid, Box, Text, AspectRatio } from '@chakra-ui/react';
import PrimaryLink from './common/PrimaryLink';
import { MainPost } from './Main/MainPagePosts';

type ContentListProps = {
  posts: MainPost[];
  borderRadius?: string;
  isShowText?: boolean;
  minH?: string;
};

const PostGridList = ({
  posts,
  borderRadius = '10',
  isShowText = true,
  minH,
  ...props
}: ContentListProps) => {
  return (
    <SimpleGrid w="100%" columns={{ base: 2, md: 3 }} spacing={2} {...props}>
      {posts.map(({ title, _id, image }) => (
        <AspectRatio ratio={1}>
          <Box
            bgImg={image || 'https://via.placeholder.com/150'}
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="center"
            minH={minH}
            key={_id}
            pos="relative"
            overflow="hidden"
            borderRadius={borderRadius}
          >
            {isShowText && (
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
              </Box>
            )}
            <PrimaryLink
              pos="absolute"
              w="100%"
              h="100%"
              top={0}
              router={`${ROUTES.DETAIL.replace(':postId', _id)}`}
            ></PrimaryLink>
          </Box>
        </AspectRatio>
      ))}
    </SimpleGrid>
  );
};

export default PostGridList;
