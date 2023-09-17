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
} from '@chakra-ui/react';
import Like from '../components/common/Like';
import Comment from '../components/common/Comment';
import { getDetail } from '../apis/detail';
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
    <Box w="568px" h="auto" mx="auto">
      <Image
        src="https://cataas.com/cat?type=png"
        alt="Cat Image"
        w="992px"
        h="408px"
      />
      {data ? (
        <>
          <Box bg="#ECE9E9" maxW="100%" maxH="10%" p={4}>
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
                        bg={data.author.isOnline ? 'green.500' : 'red.500'}
                        boxSize="1em"
                        borderColor="white"
                      />
                    </Avatar>

                    <Text fontSize="10px">{data.author.fullName}</Text>
                  </WrapItem>
                </Stack>
              </Box>
              <Box style={{ position: 'relative' }}>
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
          <Box bg="#ECE9E9" maxW="100%" maxH="10%" p={6}>
            <Text w="516px" h="238px">
              {data.channel.description}
            </Text>
          </Box>
          <Box bg="#ECE9E9" maxW="100%" maxH="10%" p={6}>
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              width="516px"
              height="450px"
              title="My Map"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Box>
          <Divider bg="#D3DCDE" />
          <Box bg="#ECE9E9" maxW="100%" maxH="5%" p="4">
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
                colorScheme="teal"
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
            <Center bg="#ECE9E9">
              <Input
                colorScheme="teal"
                width="525px"
                height="101px"
                borderRadius="5px"
              />
            </Center>
            <Box display="flex" justifyContent="flex-end" p="20px">
              <Button
                colorScheme="teal"
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
    </Box>
  );
};

export default Detail;
