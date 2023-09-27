import { Box, Text, AspectRatio, AspectRatioProps } from '@chakra-ui/react';
import PrimaryLink from './common/PrimaryLink';
import { ROUTES } from '../constants/routes';
import titleValidation from '../utils/titleValidation';

type PostCardProps = AspectRatioProps & {
  post: { _id: string; title?: string; image?: string; updatedAt?: string };
  isShowText?: boolean;
};

const PostCard = ({ post, isShowText = true, ...props }: PostCardProps) => {
  const { _id, title, image, updatedAt } = post;

  return (
    <AspectRatio
      ratio={1}
      key={_id}
      overflow="hidden"
      borderRadius="20px"
      bgImg={image ?? '../src/assets/images/no_image.png'}
      bgRepeat="no-repeat"
      bgSize="cover;"
      bgPosition="center"
      transition="all 0.3s"
      cursor="pointer"
      color="rgba(0, 0, 0, 0)"
      _hover={{ borderRadius: '0px;', color: 'rgba(211, 220, 222, 1)' }}
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
            <Text pos="absolute" bottom="50" left="15">
              {updatedAt && updatedAt.slice(0, 10)}
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
              {title && titleValidation(title)}
            </Text>
          </Box>
        )}
      </PrimaryLink>
    </AspectRatio>
  );
};

export default PostCard;
