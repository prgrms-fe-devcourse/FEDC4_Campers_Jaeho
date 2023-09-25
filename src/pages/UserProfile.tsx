import { Container, Flex, Stack, Center, Box, Input } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryHeader from '../components/common/PrimaryHeader';
import UploadImage from '../components/common/UploadImage';
import PrimaryInfo from '../components/common/PrimaryInfo';
import PrimaryButton from '../components/common/PrimaryButton';
import PrimaryLink from '../components/common/PrimaryLink';
import PrimaryGrid from '../components/common/PrimaryGrid';
import TemperatureBar from '../components/common/TemperatureBar';
import PostCard from '../components/PostCard';
import { useDisclosure } from '@chakra-ui/react';
import { MdNotifications } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { AiFillEdit } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import PrimaryModal from '../components/common/PrimaryModal';
import { useSearchUser } from '../hooks/query/useSearchUser';
import { useNotification } from '../hooks/query/useNotification';
import { useChangeUserInfo } from '../hooks/mutation/useChangeUserInfo';
import PrimaryText from '../components/common/PrimaryText';
import { useUserInfoContext } from '../contexts/UserInfoProvider';
import { isSameUser } from '../utils/isSameUser';
import PrimaryImage from '../components/common/PrimaryImage';
import { useLogout } from '../hooks/mutation/useLogout';
import { useHandleNotification } from '../hooks/mutation/useHandleNotification';
import { useFollow } from '../hooks/mutation/useFollow';

const UserProfile = () => {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMyInfo, setIsMyInfo] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userId } = useParams();
  const { getSearchUser: { data, error } = {} } = useSearchUser(userId);
  const { data: notificationData } = useNotification();
  const { postProfileImage, putUserInfo } = useChangeUserInfo();
  const postLogout = useLogout();
  const { postCreateNotification } = useHandleNotification();
  const { createPostFollow } = useFollow();
  const navigate = useNavigate();
  const userData = useUserInfoContext();

  const handleChange = (file: File) => {
    setUserImage(file);
  };

  const handleLogout = () => {
    postLogout.mutate();
  };

  const handleFollow = () => {
    if (userData && data) {
      createPostFollow.mutate(data._id);
      postCreateNotification.mutate({
        notificationType: 'FOLLOW',
        notificationTypeId: userData._id,
        userId: data._id,
        postId: null,
      });
    }
  };

  useEffect(() => {
    if (userData && data) {
      isSameUser(userData._id, data._id) && setIsMyInfo(true);
    }
  }, [data?._id, userData?._id]);

  useEffect(() => {
    if (data?.fullName !== userName && userName !== '' && isEdit === false) {
      putUserInfo.mutate({ fullName: userName, username: userName });
    }
  }, [isEdit]);

  useEffect(() => {
    const newForm = new FormData();
    if (userImage) {
      newForm.append('isCover', 'false');
      newForm.append('image', userImage);
      postProfileImage.mutate(newForm);
    }
  }, [userImage]);

  error && navigate('/');

  return (
    <>
      {data && notificationData ? (
        <>
          <PrimaryModal isOpen={isOpen} onClose={onClose}>
            <Box>
              {notificationData.length !== 0 ? (
                notificationData.map(({ message, _id }) => (
                  <Flex
                    key={_id}
                    align="center"
                    p="10px"
                    transition="all 0.3s"
                    _hover={{ bgColor: '#D9D9D9' }}
                  >
                    <BiMessageDetail />
                    <Box m="0 0 0 10px">{message}</Box>
                  </Flex>
                ))
              ) : (
                <Center p="20px 0">아직 뭐가 없네요..</Center>
              )}
            </Box>
          </PrimaryModal>
          <Container my={5}>
            <PrimaryHeader>
              <PrimaryLink router={-1}>
                <GrFormPrevious fontSize="25px" />
              </PrimaryLink>
              <Box flex={1}></Box>
              <Flex gap="10px" fontSize="25px">
                {isMyInfo && <MdNotifications onClick={onOpen} />}
              </Flex>
            </PrimaryHeader>
            <Stack spacing={4} align="center">
              {isMyInfo ? (
                <UploadImage
                  borderRadius="full"
                  handleOnChange={handleChange}
                  image={data.image}
                />
              ) : (
                <PrimaryImage imageSrc={data.image} borderRadius="full" />
              )}

              <Flex align="center">
                {isEdit ? (
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                ) : (
                  <PrimaryText as="b" mr={1}>
                    {data.fullName}
                  </PrimaryText>
                )}
                {isMyInfo && <AiFillEdit onClick={() => setIsEdit(!isEdit)} />}
              </Flex>
              <PrimaryText color="gray.300">{data.email}</PrimaryText>
              <TemperatureBar value={60} maxW="70%" />
              <Flex gap={10} textAlign="center">
                <PrimaryInfo title={`${data.posts.length}`} subTitle="게시물" />
                <PrimaryInfo
                  title={`${data.followers?.length ?? 0}`}
                  subTitle="팔로워"
                />
                <PrimaryInfo
                  title={`${data.following?.length ?? 0}`}
                  subTitle="팔로잉"
                />
              </Flex>
              {isMyInfo ? (
                <PrimaryButton w="150px" onClick={handleLogout}>
                  로그아웃
                </PrimaryButton>
              ) : (
                <PrimaryButton w="150px" onClick={handleFollow}>
                  팔로우
                </PrimaryButton>
              )}
              <PrimaryGrid spacing={0}>
                {data.posts.map(({ _id, title, image }) => (
                  <PostCard
                    post={{ _id, title, image }}
                    key={_id}
                    isShowText={false}
                    borderRadius="none"
                  />
                ))}
              </PrimaryGrid>
            </Stack>
          </Container>
        </>
      ) : null}
    </>
  );
};

export default UserProfile;
