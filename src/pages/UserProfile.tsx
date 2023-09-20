import { Container, Flex, GridItem, Stack, Image } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { searchUser } from '../apis/search';
import { useQuery } from '@tanstack/react-query';
import { FileImage } from '../apis/search';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryHeader from '../components/common/PrimaryHeader';
import UploadImage from '../components/common/UploadImage';
import UserInfoItem from '../components/common/UserInfoItem';
import PrimaryButton from '../components/common/PrimaryButton';
import GridList from '../components/common/GridList';
import PrimaryLink from '../components/common/PrimaryLink';

const UserProfile = () => {
  const [userPostsData, setUserPostsData] = useState<FileImage[]>([]);
  const [userInfo, setUserInfo] = useState({
    email: '',
    fullName: '',
    totalFollowers: 0,
    totalFollowings: 0,
  });
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data, error } = useQuery(['user', 'info', userId], () =>
    searchUser(userId!)
  );

  useEffect(() => {
    if (data) {
      const { email, fullName, followers, followings, posts } = data;
      setUserInfo({
        email,
        fullName,
        totalFollowers: followers ? followers.length : 0,
        totalFollowings: followings ? followings.length : 0,
      });

      Array.isArray(posts) &&
        setUserPostsData(
          posts.map((post) => ({
            _id: post._id,
            image: post.image,
          }))
        );
    }
    error && navigate('/not-found');
  }, [data, error]);

  return (
    <Container my={5}>
      <PrimaryHeader>
        <PrimaryLink router={-1}>
          <ChevronLeftIcon boxSize={8} />
        </PrimaryLink>
      </PrimaryHeader>
      <Stack spacing={4} align="center">
        <UploadImage borderRadius="full" />
        <UserInfoItem title={userInfo.fullName} subTitle={userInfo.email} />
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
        <GridList>
          {userPostsData &&
            userPostsData.map((post) => (
              <GridItem key={post._id}>
                <Image src={post.image} />
              </GridItem>
            ))}
        </GridList>
      </Stack>
    </Container>
  );
};

export default UserProfile;
