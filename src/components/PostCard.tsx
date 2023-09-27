import { Box, Text, AspectRatio, AspectRatioProps } from '@chakra-ui/react';
import PrimaryLink from './common/PrimaryLink';
import { ROUTES } from '../constants/routes';

type PostCardProps = AspectRatioProps & {
  post: { _id: string; title?: string; image?: string };
  isShowText?: boolean;
};

const PostCard = ({ post, isShowText = true, ...props }: PostCardProps) => {
  const { _id, title, image } = post;

  return (
    <AspectRatio
      ratio={1}
      key={_id}
      overflow="hidden"
      borderRadius="10"
      bgImg={image ?? '../src/assets/images/no_image.png'}
      bgRepeat="no-repeat"
      bgSize="cover;"
      bgPosition="center"
      transition="all 0.3s"
      cursor="pointer"
      _hover={{ bgSize: 'cover;' }}
      {...props}
    >
      <PrimaryLink router={`${ROUTES.POST_DETAIL(_id)}`}>
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
            {/* <Text pos="absolute" bottom="50" left="15" color="#D3DCDE">
              북한
            </Text> */}
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
  );
};

export default PostCard;
