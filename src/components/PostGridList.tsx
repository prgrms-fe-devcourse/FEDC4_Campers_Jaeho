import { ROUTES } from '../constants/routes';
import {
  SimpleGrid,
  Box,
  Text,
  AspectRatio,
  AspectRatioProps,
} from '@chakra-ui/react';
import PrimaryLink from './common/PrimaryLink';
import { MainPost } from './Main/MainPagePosts';

type ContentListProps = {
  posts: MainPost[];
  isShowText?: boolean;
  spacing?: number;
};

const PostGridList = ({
  posts,
  isShowText = true,
  spacing = 2,
  ...props
}: ContentListProps & AspectRatioProps) => {
  return (
    <SimpleGrid w="100%" columns={{ base: 2, md: 3 }} spacing={spacing}>
      {posts.map(({ title, _id, image }) => (
        <AspectRatio
          ratio={1}
          key={_id}
          overflow="hidden"
          borderRadius="10"
          bgImg={image || '../src/assets/images/no_image.png'}
          bgRepeat="no-repeat"
          bgSize="100% auto;"
          bgPosition="center"
          transition="all 0.3s"
          _hover={{ bgSize: '110% auto;' }}
          {...props}
        >
          <PrimaryLink router={`${ROUTES.DETAIL.replace(':postId', _id)}`}>
            {isShowText && (
              <Box
                pos="relative"
                w="100%"
                h="100%"
                bg="linear-gradient(
                  180deg,
                  rgba(2, 0, 36, 0) 0%,
                  rgba(33, 33, 116, 0) 20%,
                  rgba(0, 0, 0, 0.6) 100%
                )"
              >
                <Text pos="absolute" bottom="50" left="15" color="#D3DCDE">
                  북한
                </Text>
                <Text
                  pos="absolute"
                  bottom="15"
                  left="15"
                  color="#eee"
                  fontSize="xl"
                  overflow="hidden"
                  maxW="90%"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  fontWeight="bold"
                >
                  {title}
                </Text>
              </Box>
            )}
          </PrimaryLink>
        </AspectRatio>
      ))}
    </SimpleGrid>
  );
};

export default PostGridList;
