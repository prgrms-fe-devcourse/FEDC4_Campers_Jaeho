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
  AspectRatio,
  useBoolean,
} from '@chakra-ui/react';
import Comment from '../components/common/Comment';
import TemperatureBar from '../components/common/TemperatureBar';
import PrimaryAvatar from '../components/common/PrimaryAvatar';
import PrimaryButton from '../components/common/PrimaryButton';
import RecommendButton from '../components/common/RecommendButton';
import { formatDate } from '../utils/formateData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PrimaryText from '../components/common/PrimaryText';
import { useDetailPost } from '../hooks/query/useDetailPost';
import { InputForm } from '../components/common/InputForm';
import { CommentInfo } from '../types/detail';
import { v4 as uuidv4 } from 'uuid';
import { useUserInfoContext } from '../contexts/UserInfoProvider';
const Detail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useBoolean();
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const { data: { postInfo, commentInfo, likeInfo } = {}, isLoading } =
    useDetailPost(postId);
  const userInfo = useUserInfoContext();
  const doesUserIdExist = (arr, id) => {
    const foundUser = arr.find((item) => item.user === id);
    console.log('foundUser', foundUser);
    console.log('compare', id);

    return !!foundUser;
  };
  const handleComment = (newcomment: string): void => {
    const Info = {
      _id: uuidv4(),
      fullName: userInfo?.fullName,
      isOnline: userInfo?.isOnline,
      image: userInfo?.image,
    };
    setComments([...comments, { comment: newcomment, ...Info }]);
  };
  useEffect(() => {
    setComments(commentInfo);
  }, [isLoading]);

  const handleDelete = (commentId) => {
    console.log(commentId);
    if (commentId === userInfo?._id) {
      alert('deldete');
      /*
      deleteComment.mutateAsync({
        postId: userInfo?._id,
      });*/
    }
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
                  <PrimaryText
                    fontSize={10}
                    children={formatDate(postInfo?.updatedAt)}
                  />
                  <WrapItem>
                    <PrimaryAvatar
                      userId={postInfo?._id}
                      size={'sm'}
                      name={postInfo?.fullName}
                      src={postInfo?.image}
                      isOnline={postInfo?.isOnline}
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
                <RecommendButton
                  recommendCount={likeInfo?.length}
                  isRecommended={doesUserIdExist(likeInfo, userInfo?._id)}
                  bg="#D3DCDE"
                  width={20}
                  height={30}
                  top={10}
                  size={'lg'}
                  postId={postId}
                />
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
          <AspectRatio ratio={1}>
            <Box bg="#ECE9E9" maxW="100%">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
                width="95%"
                height="90%"
              />
            </Box>
          </AspectRatio>
          <Divider bg="gray.100" />
          <Box bg="#ECE9E9" maxW="100%" maxH="5%" p={4}>
            <Box>
              {comments
                ?.slice(0, 3)
                .map((comment) => (
                  <Comment
                    comment={comment.comment}
                    image={comment.image}
                    isOnline={comment.isOnline}
                    name={comment.fullName}
                    userId={comment._id}
                    handleDelete={handleDelete}
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
                    {comments?.map((comment) => (
                      <Comment
                        comment={comment.comment}
                        image={'https://i.pravatar.cc/2'}
                        isOnline={comment.isOnline}
                        name={comment.fullName}
                        userId={comment._id}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Center>
          </Box>
          <Box bg="#ECE9E9" maxW="100%">
            <InputForm postId={postId} handleComment={handleComment} />
          </Box>
        </>
      )}
    </Container>
  );
};
export default Detail;
