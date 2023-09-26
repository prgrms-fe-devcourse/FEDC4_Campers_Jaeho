import {
  Box,
  Flex,
  Image,
  Stack,
  Center,
  Divider,
  WrapItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Container,
  useBoolean,
} from '@chakra-ui/react';
import Comment from '../components/common/Comment';
import TemperatureBar from '../components/common/TemperatureBar';
import PrimaryAvatar from '../components/common/PrimaryAvatar';
import PrimaryButton from '../components/common/PrimaryButton';
import RecommendButton from '../components/common/RecommendButton';
import { formatDate } from '../utils/formateData';
import { useParams } from 'react-router-dom';
import PrimaryText from '../components/common/PrimaryText';
import { useDetailPost } from '../hooks/query/useDetailPost';
import { InputForm } from '../components/common/InputForm';
import { useUserInfoContext } from '../contexts/UserInfoProvider';

const Detail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useBoolean();
  const { data: { postInfo, commentInfo, likeInfo } = {}, isLoading } =
    useDetailPost(postId);
  const { userInfo } = useUserInfoContext();
  const doesUserIdExist = (arr: { user: string }[], id: string): boolean => {
    const foundUser = arr.find((item) => item.user === id);

    return !!foundUser;
  };

  return (
    <Container maxW="100%" h="auto">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box bg="#ECE9E9" maxW="100%" maxH="5%" p={5}>
            <Image src={postInfo?.image} maxW="100%" maxH="5%" />
            <Flex justifyContent="space-between">
              <Box>
                <Stack spacing={2}>
                  <PrimaryText fontSize={15}>
                    {postInfo?.updatedAt ? formatDate(postInfo.updatedAt) : ''}
                  </PrimaryText>
                  <WrapItem>
                    <PrimaryAvatar
                      size={'sm'}
                      name={postInfo?.fullName}
                      src={postInfo?.authorImage}
                      isOnline={postInfo?.isOnline || false}
                    />
                    <Box>
                      <PrimaryText
                        fontSize={15}
                        children={postInfo?.fullName}
                      />
                      <TemperatureBar value={80} />
                    </Box>
                  </WrapItem>
                </Stack>
              </Box>
              <Box>
                {postId && likeInfo && (
                  <RecommendButton
                    recommendCount={likeInfo?.length ?? null}
                    isRecommended={
                      userInfo?._id !== null && userInfo?._id !== undefined
                        ? doesUserIdExist(likeInfo, userInfo._id)
                        : false
                    }
                    bg="#D3DCDE"
                    width={20}
                    height={30}
                    top={10}
                    size={'lg'}
                    postId={postId}
                  />
                )}
              </Box>
            </Flex>
          </Box>
          <Box bg="#ECE9E9" maxW="100%" maxH="5%" p={5}>
            <PrimaryText
              maxW="80%"
              h={238}
              fontSize={20}
              children={postInfo?.description}
            />
          </Box>

          <Divider bg="gray.100" />
          <Box bg="#ECE9E9" maxW="100%" maxH="5%" p={4}>
            <Box>
              {commentInfo
                ?.slice(0, 3)
                .map((comment) => (
                  <Comment
                    comment={comment.comment}
                    image={comment.author_image}
                    isOnline={comment?.isOnline || false}
                    name={comment.fullName}
                    userId={comment.author_id}
                  />
                ))}
            </Box>
            <Center>
              <PrimaryButton
                alignSelf="center"
                width={82}
                height={35}
                borderRadius={5}
                onClick={setIsDrawerOpen.on}
                disabled={isDrawerOpen}
              >
                더 보기
              </PrimaryButton>
              <Drawer
                placement="bottom"
                isOpen={isDrawerOpen}
                onClose={setIsDrawerOpen.off}
                size="xs"
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>댓글</DrawerHeader>
                  <DrawerBody>
                    {commentInfo?.map((comment) => (
                      <Comment
                        comment={comment.comment}
                        image={comment.author_image}
                        isOnline={comment?.isOnline || false}
                        name={comment.fullName}
                        userId={comment.author_id}
                      />
                    ))}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Center>
          </Box>
          <Box bg="#ECE9E9" maxW="100%">
            {postId && <InputForm postId={postId} />}
          </Box>
        </>
      )}
    </Container>
  );
};
export default Detail;
