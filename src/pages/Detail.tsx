import {
  Box,
  Flex,
  Image,
  Input,
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
import { useCallback } from 'react';
import PrimaryText from '../components/common/PrimaryText';

import _ from 'lodash';
import { useDetailPost } from '../hooks/apis/Query/useDetaiPost';

const Detail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useBoolean();
  const handleKeyDown = useCallback(
    _.debounce(
      (e) => {
        if (e.key === 'Enter') {
          console.log('Enter key pressed');
          console.log(postId);
        }
      },
      1000,
      { leading: true, trailing: false }
    ),
    []
  );

  const { data: { postInfo, commentInfo, likeCount } = {}, isLoading } =
    useDetailPost(postId);

  console.log(postInfo, commentInfo, likeCount);

  return (
    <Container maxW="100%" h="auto">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box bg="#ECE9E9" maxW="100%" maxH="5%" p={5}>
            <Image src={postInfo?.postimage} maxW="100%" maxH="5%" />
            <Flex justifyContent="space-between">
              <Box>
                <Stack spacing={2}>
                  <PrimaryText
                    fontSize={10}
                    children={formatDate(postInfo.updatedAt)}
                  />
                  <WrapItem>
                    <PrimaryAvatar
                      userId={postInfo._id}
                      size={'sm'}
                      name={postInfo.fullName}
                      src={postInfo?.image}
                      isOnline={postInfo.isOnline}
                    />
                    <Box>
                      <PrimaryText fontSize={15} children={postInfo.fullName} />
                      <TemperatureBar value={80} />
                    </Box>
                  </WrapItem>
                </Stack>
              </Box>
              <Box>
                <RecommendButton
                  recommendCount={likeCount}
                  isRecommended={false}
                  bg="#D3DCDE"
                  width={20}
                  height={30}
                  top={10}
                  size={'lg'}
                />
              </Box>
            </Flex>
          </Box>
          <Box bg="#ECE9E9" maxW="100%" maxH="5%" p={5}>
            <PrimaryText
              maxW="80%"
              h={238}
              fontSize={20}
              children={postInfo.description}
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
              {commentInfo
                ?.slice(0, 3)
                .map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment.comment}
                    image={comment.image}
                    isOnline={comment.isOnline}
                    name={comment.fullName}
                    userId={comment._id}
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
                        key={comment._id}
                        comment={comment.comment}
                        image={'https://i.pravatar.cc/2'}
                        isOnline={comment.isOnline}
                        name={comment.fullName}
                        userId={comment._id}
                      />
                    ))}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Center>
          </Box>
          <Box bg="#ECE9E9" maxW="100%">
            <Center>
              <Input
                focusBorderColor="green.400"
                maxW="94%"
                height={101}
                borderRadius={5}
                bg="gray.100"
                onKeyDown={handleKeyDown}
              />
            </Center>
            <Box display="flex" justifyContent="flex-end" p="20px">
              <PrimaryButton width={82} height={35} borderRadius={5}>
                댓글달기!
              </PrimaryButton>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Detail;
