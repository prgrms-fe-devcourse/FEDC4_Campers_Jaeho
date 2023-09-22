import { Container, Flex, Stack, Button } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { searchUser } from '../apis/search';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, MouseEventHandler } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryHeader from '../components/common/PrimaryHeader';
import UploadImage from '../components/common/UploadImage';
import PrimaryInfo from '../components/common/PrimaryInfo';
import PrimaryButton from '../components/common/PrimaryButton';
import PrimaryLink from '../components/common/PrimaryLink';
import PostGridList from '../components/PostGridList';
import TemperatureBar from '../components/common/TemperatureBar';
type FileImage = {
  _id: string;
  image?: string;
};

const UserProfile = () => {
  const [userPostsData, setUserPostsData] = useState<FileImage[]>([]);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState({
    email: '',
    fullName: '',
    totalFollowers: 0,
    totalFollowings: 0,
  });
  const { userId } = useParams();

  const navigate = useNavigate();
  // 머지되면 react query 훅을 사용해 리팩토링 예정
  const { data, error } = useQuery(['user', 'info', userId], () =>
    searchUser(userId!)
  );

  const handleSubmit: MouseEventHandler<HTMLButtonElement | null> = () => {
    // 훅 폼 받아 upload post 쏠 예정
    const newForm = new FormData();
    newForm.append('isCover', 'false');
    if (userImage) {
      newForm.append('image', userImage);
    }
  };

  const handleChange = (file: File) => {
    setUserImage(file);
  };

  useEffect(() => {
    if (data) {
      const { email, fullName, followers, following, posts } = data;
      setUserInfo({
        email,
        fullName,
        totalFollowers: followers ? followers.length : 0,
        totalFollowings: following ? following.length : 0,
      });

      if (Array.isArray(posts)) {
        setUserPostsData(
          posts.map(({ _id, image }) => ({
            _id,
            image,
          }))
        );
      }
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
        <UploadImage borderRadius="full" handleOnChange={handleChange} />
        <PrimaryInfo title={userInfo.fullName} subTitle={userInfo.email} />
        <TemperatureBar value={80} maxW="70%" />
        <Flex gap={10} textAlign="center">
          <PrimaryInfo title={`${userPostsData.length}`} subTitle="게시물" />
          <PrimaryInfo title={`${userInfo.totalFollowers}`} subTitle="팔로워" />
          <PrimaryInfo
            title={`${userInfo.totalFollowings}`}
            subTitle="팔로잉"
          />
        </Flex>
        <Flex gap={3}>
          <PrimaryButton w="150px">메시지</PrimaryButton>
          <PrimaryButton w="150px">로그아웃</PrimaryButton>
        </Flex>
        <PostGridList
          posts={userPostsData}
          borderRadius="0"
          isShowText={false}
          spacing={0}
        />
      </Stack>
      <Button onClick={handleSubmit}>변경 UI</Button>
    </Container>
  );
};

export default UserProfile;
