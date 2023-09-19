import {
  Image,
  Grid,
  GridItem,
  Input,
  Stack,
  Flex,
  Text,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import { searchUser, FileImage } from '../apis/search';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TemperatureBar from './common/TemperatureBar';
import UserInfoItem from './common/UserInfoItem';
import PrimaryButton from './common/PrimaryButton';
import { useQuery } from '@tanstack/react-query';
import PrimaryHeader from './common/PrimaryHeader';
import PrimaryLink from './common/PrimaryLink';

type ProfileImage = File | null;

const UserInfo = () => {
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

  // 로딩중 처리 예정 isLoading? isFetching?
  const { error, data } = useQuery(['user-info', userId], () =>
    searchUser(userId!)
  );

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

  const handleAddFile = () => {
    imageRef.current?.click();
  };

  return (
    <>
      <PrimaryHeader>
        <PrimaryLink router={-1}>
          <ChevronLeftIcon boxSize={8} />
          <Text>{userInfo.fullName}</Text>
        </PrimaryLink>
      </PrimaryHeader>
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
