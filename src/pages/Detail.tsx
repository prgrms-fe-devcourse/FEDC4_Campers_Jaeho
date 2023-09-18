type Author = {
  fullName: string;
  _id: string;
  isOnline: boolean;
};

type Channel = {
  description: string;
};

type DetailData = {
  title: string;
  updatedAt: string;
  author: Author;
  comments: Comment[];
  likes: number;
  channel: Channel;
};

type Comment = {
  _id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  post: string;
  __v: number;
  author: {
    role: string;
    emailVerified: boolean;
    banned: boolean;
    isOnline: boolean;
    posts: string[];
  };
};

import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Input,
  Button,
  Stack,
  Center,
  Divider,
  WrapItem,
  Avatar,
  AvatarBadge,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Container,
  AspectRatio,
} from '@chakra-ui/react';
import Like from '../components/common/Like';
import Comment from '../components/common/Comment';
import { getDetail } from '../apis/detail';
import TemperatureBar from '../components/common/TemperatureBar';
const Detail = () => {
  const [data, setData] = useState<DetailData | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getDetail();
      if (fetchedData) {
        setData(fetchedData.responseData);
        setComments(fetchedData.responseData.comments);
      } else {
        console.error('Data is undefined.');
      }
    };
    fetchData();
  }, []);

  return (
    <Container w="568px" h="auto">
      <Image src="src/images/more.png" alt="Cat Image" maxW="100%" maxH="5%" />
      {data ? (
        <>
          <Box bg="#ECE9E9" maxW="100%" maxH="10%" p="10px">
            <Flex justifyContent="space-between">
              <Box>
                <Stack spacing={2}>
                  <Text fontSize="10px">
                    {new Date(data.updatedAt).toLocaleString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                  <Text fontSize="30px">{data.title}</Text>
                  <WrapItem>
                    <Avatar
                      name={data.author.fullName}
                      src="https://i.pravatar.cc/2"
                    >
                      <AvatarBadge
                        bg={
                          data.author.isOnline ? 'green.400' : 'blackAlpha.400'
                        }
                        boxSize="1em"
                        borderColor="blackAlpha.400"
                      />
                    </Avatar>
                    <Box p="5px">
                      <Text fontSize="15px">{data.author.fullName}</Text>
                      <TemperatureBar value={80} />
                    </Box>
                  </WrapItem>
                </Stack>
              </Box>
              <Box>
                <Like
                  likeCount={data.likes}
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
              {data.channel.description}
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
                    id={comment._id}
                    comment={comment.comment}
                    image="https://i.pravatar.cc/2"
                    isOnline={comment.author.isOnline}
                  />
                ))}
            </Box>
            <Center>
              <Button
                colorScheme="green"
                width="82px"
                height="35px"
                borderRadius="5px"
                alignSelf="center"
                onClick={() => setIsDrawerOpen(true)}
              >
                더 보기
              </Button>
              <Drawer
                placement="bottom"
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
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
                        id={comment._id}
                        comment={comment.comment}
                        image={'https://i.pravatar.cc/2'}
                        isOnline={comment.author.isOnline}
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
              <Button
                colorScheme="green"
                width="82px"
                height="35px"
                borderRadius="5px"
              >
                댓글달기!
              </Button>
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
