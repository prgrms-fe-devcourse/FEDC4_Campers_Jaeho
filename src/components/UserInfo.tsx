import {
  Image,
  Text,
  Progress,
  Flex,
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Stack,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import { searchUser } from '../apis/search';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FileImage } from '../apis/search';

type ProfileImage = File | null;

const Info = () => {
  const [selectedImage, setSelectedImage] = useState<ProfileImage>(null);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    totalFollowers: 0,
    totalFollowings: 0,
  });
  const [userPostImage, setUserPostImage] = useState<FileImage[]>([]);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await searchUser('64f7f609b3b4d210bb7b4fa7');

        if (response) {
          const { email, fullName, followers, followings, posts } = response;
          setUserInfo({
            fullName,
            email,
            totalFollowers: followers ? followers.length : 0,
            totalFollowings: followings ? followings.length : 0,
          });

          if (Array.isArray(posts)) {
            setUserPostImage(
              posts.map((post) => ({
                id: uuidv4(),
                image: post.image,
              }))
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []); // 아마 id가 들어가야 함

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files) {
      const newFile = event.target.files[0];
      setSelectedImage(newFile);
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleAddFile = () => {
    imageRef.current?.click();
  };

  return (
    <>
      <Flex>
        <ChevronLeftIcon onClick={handlePrev} boxSize={8} />
      </Flex>
      <Stack spacing={4} alignItems="center">
        <Image
          borderRadius="full"
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : 'https://via.placeholder.com/150'
          }
          alt="userInfo"
          boxSize="150px"
          objectFit="cover"
          onClick={handleAddFile}
        />
        <Input
          type="file"
          accept="image/*"
          ref={imageRef}
          onChange={handleFileSelect}
          display="none"
        />
        <Box textAlign="center">
          <Text as="b" fontSize="2xl">
            {userInfo.fullName}
          </Text>
          <Text fontSize="xs" color="blackAlpha.600">
            {userInfo.email}
          </Text>
        </Box>
        <Flex w="90%" alignItems="center" justifyContent="center" gap={4}>
          <Progress w="80%" value={80} rounded="base" colorScheme="green" />
          <Text color="green.400" fontSize="sm">
            80%
          </Text>
        </Flex>
        <Flex gap={10} textAlign="center">
          <Box>
            <Text as="b">{userPostImage.length}</Text>
            <Text color="blackAlpha.600" fontSize="12px">
              게시물
            </Text>
          </Box>
          <Box>
            <Text as="b">{userInfo.totalFollowers}</Text>
            <Text color="blackAlpha.600" fontSize="12px">
              팔로워 수
            </Text>
          </Box>
          <Box>
            <Text as="b">{userInfo.totalFollowings}</Text>
            <Text color="blackAlpha.600" fontSize="12px">
              팔로잉 수
            </Text>
          </Box>
        </Flex>
        <Flex gap={3}>
          <Button w="150px">메시지</Button>
          <Button w="150px">로그아웃</Button>
        </Flex>
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        >
          {userPostImage &&
            userPostImage.map((file) => (
              <GridItem key={file.id}>
                <Image src={file.image} />
              </GridItem>
            ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Info;
