type PosterInfo = {
  title: string;
  updatedAt: string;
  fullName: string;
  description: string;
  _id: string;
  isOnline: boolean;
};

type CommentInfo = {
  _id: string;
  comment: string;
  fullName: string;
  isOnline: boolean;
};

type SearchPosterResponse = {
  posterInfo: PosterInfo;
  commentInfo: CommentInfo[];
  likeCount: number;
};

import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
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
import { formatDate } from '../utils/Date';
import { useParams } from 'react-router-dom';
import { searchPoster } from '../apis/search';
const Detail = () => {
  const [data, setData] = useState<SearchPosterResponse | null>(null);
  const [comments, setComments] = useState<CommentInfo[] | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useBoolean();
  useEffect(() => {
    if (postId === undefined) return;
    const fetchData = async () => {
      const fetchedData = await searchPoster(postId);
      if (fetchedData) {
        setData(fetchedData);
        setComments(fetchedData.commentInfo);
      } else {
        console.error('Data is undefined.');
      }
    };
    fetchData();
  }, [postId]);

  return (
    <Container w="568px" h="auto">
      <Image src="src/images/more.png" maxW="100%" maxH="5%" />
      {data ? (
        <>
          <Box bg="#ECE9E9" maxW="100%" maxH="10%" p="10px">
            <Flex justifyContent="space-between">
              <Box>
                <Stack spacing={2}>
                  <Text fontSize="10px">
                    {formatDate(data.posterInfo.updatedAt)}
                  </Text>
                  <Text fontSize="30px">{data.posterInfo.title}</Text>
                  <WrapItem>
                    <PrimaryAvatar
                      userId={data.posterInfo._id}
                      size={'sm'}
                      name={data.posterInfo.fullName}
                      src="https://i.pravatar.cc/2"
                      isOnline={data.posterInfo.isOnline}
                    />
                    <Box p="5px">
                      <Text fontSize="15px">{data.posterInfo.fullName}</Text>
                      <TemperatureBar value={80} />
                    </Box>
                  </WrapItem>
                </Stack>
              </Box>
              <Box>
                <RecommendButton
                  recommendCount={data.likeCount}
                  isRecommended={false}
                  bg="#D3DCDE"
                  width="40px"
                  height="40px"
                  marginBottom="40px"
                  style={{ top: '20px' }}
                />
              </Box>
            </Flex>
          </Box>
          <Box bg="#ECE9E9" maxW="100%" maxH="5%" p="10px">
            <Text maxW="80%" h="238px" fontSize="20px">
              {data.posterInfo.description}
            </Text>
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
          <Box bg="#ECE9E9" maxW="100%" maxH="5%" p="4px">
            <Box>
              {comments
                ?.slice(0, 3)
                .map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment.comment}
                    image={'https://i.pravatar.cc/2'}
                    isOnline={comment.isOnline}
                    name={comment.fullName}
                  />
                ))}
            </Box>

            <Center>
              <PrimaryButton
                alignSelf="center"
                width="82px"
                height="35px"
                borderRadius="5px"
                onClick={() => setIsDrawerOpen.on}
                disabled={isDrawerOpen}
              >
                더 보기
              </PrimaryButton>
              <Drawer
                placement="bottom"
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen.off}
                size="xs"
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>댓글</DrawerHeader>
                  <DrawerBody>
                    {comments?.map((comment) => (
                      <Comment
                        key={comment._id}
                        comment={comment.comment}
                        image={'https://i.pravatar.cc/2'}
                        isOnline={comment.isOnline}
                        name={comment.fullName}
                      />
                    ))}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Center>
          </Box>
          <Box bg="#ECE9E9" maxW="100%">
            <Center bg="#green.400">
              <Input
                focusBorderColor="green.400"
                maxW="94%"
                height="101px"
                borderRadius="5px"
                bg="gray.100"
              />
            </Center>
            <Box display="flex" justifyContent="flex-end" p="20px">
              <PrimaryButton
                colorScheme="green"
                width="82px"
                height="35px"
                borderRadius="5px"
              >
                댓글달기!
              </PrimaryButton>
            </Box>
          </Box>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default Detail;
