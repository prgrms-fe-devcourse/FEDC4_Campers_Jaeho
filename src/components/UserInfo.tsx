import { Image, Grid, GridItem, Input, Stack, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import { searchUser, FileImage } from '../apis/search';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TemperatureBar from './common/TemperatureBar';
import UserInfoItem from './common/UserInfoItem';
import PrimaryButton from './common/PrimaryButton';

type ProfileImage = File | null;

const UserInfo = () => {
  const [selectedImage, setSelectedImage] = useState<ProfileImage>(null);
  const [userPostsData, setUserPostsData] = useState<FileImage[]>([]);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    totalFollowers: 0,
    totalFollowings: 0,
  });
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
            setUserPostsData(
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
  }, []); // 아마 userId가 들어가야 함

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
