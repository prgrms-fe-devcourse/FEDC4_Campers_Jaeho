import {
  Image,
  Grid,
  GridItem,
  Input,
  Stack,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Center,
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { searchUser, FileImage } from '../apis/search';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TemperatureBar from './common/TemperatureBar';
import UserInfoItem from './common/UserInfoItem';
import PrimaryButton from './common/PrimaryButton';
import { useQuery } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';
import { MdNotifications } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { AiFillEdit } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import axios from 'axios';
import { getLocalStorage } from '../utils/storage';

BiMessageDetail;

type ProfileImage = File | null;

const axiosNotifications = async (token: string) => {
  if (token) {
    try {
      const response = await axios.get(
        'https://kdt.frontend.4th.programmers.co.kr:5009/notifications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

const UserInfo = () => {
  const token = getLocalStorage('token');
  const [selectedImage, setSelectedImage] = useState<ProfileImage>(null);
  const [userPostsData, setUserPostsData] = useState<FileImage[]>([]);
  const { userId } = useParams<{ userId: string }>();
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    totalFollowers: 0,
    totalFollowings: 0,
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  // 로딩중 처리 예정 isLoading? isFetching?
  const { error, data } = useQuery(['user-info', userId], () =>
    searchUser(userId!)
  );
  const [notifications, setNotifications] = useState([]);
  const newNotification = useQuery(['noti', token], () =>
    axiosNotifications(token)
  ).data;

  useEffect(() => {
    if (data) {
      const { email, fullName, followers, followings, posts } = data;
      setUserInfo({
        fullName,
        email,
        totalFollowers: followers ? followers.length : 0,
        totalFollowings: followings ? followings.length : 0,
      });

      if (Array.isArray(posts)) {
        setUserPostsData(
          posts.map((post) => ({
            id: uuidv4(),
            image: post.image,
          }))
        );
      }
      if (token) {
        setNotifications(newNotification);
      }
    }
    error && console.error(error);
  }, [data, error]);

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent margin="20px" overflow="hidden">
          <Box>
            {notifications.length !== 0 ? (
              notifications.map(({ message, _id }) => (
                <Flex
                  align="center"
                  p="10px"
                  transition="all 0.3s"
                  _hover={{ bgColor: '#D9D9D9' }}
                >
                  <BiMessageDetail />
                  <Box key={_id} m="0 0 0 10px">
                    {message}
                  </Box>
                </Flex>
              ))
            ) : (
              <Center p="20px 0">아직 뭐가 없네요..</Center>
            )}
          </Box>
        </ModalContent>
      </Modal>

      <Flex fontSize="30px" p="20px 0">
        <Box flexGrow="1">
          <GrFormPrevious onClick={handlePrev} />
        </Box>
        <Flex gap="10px">
          <MdNotifications onClick={onOpen} />
          <AiFillEdit />
        </Flex>
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
        <UserInfoItem title={userInfo.fullName} subTitle={userInfo.email} />
        <TemperatureBar value={80} />
        <Flex gap={10} textAlign="center">
          <UserInfoItem title={`${userPostsData.length}`} subTitle="게시물" />
          <UserInfoItem
            title={`${userInfo.totalFollowers}`}
            subTitle="팔로워"
          />
          <UserInfoItem
            title={`${userInfo.totalFollowings}`}
            subTitle="팔로잉"
          />
        </Flex>
        <Flex gap={3}>
          <PrimaryButton w="150px">메시지</PrimaryButton>
          <PrimaryButton w="150px">로그아웃</PrimaryButton>
        </Flex>
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        >
          {userPostsData &&
            userPostsData.map((post) => (
              <GridItem key={post.id}>
                <Image src={post.image} />
              </GridItem>
            ))}
        </Grid>
      </Stack>
    </>
  );
};

export default UserInfo;
