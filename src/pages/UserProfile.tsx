import { useState, useEffect } from 'react';
import { useUserInfoContext } from '../contexts/UserInfoProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, useToast } from '@chakra-ui/react';
import { MdNotifications } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import PrimaryHeader from '../components/common/PrimaryHeader';
import UploadImage from '../components/common/UploadImage';
import PrimaryInfo from '../components/common/PrimaryInfo';
import PrimaryButton from '../components/common/PrimaryButton';
import PrimaryGrid from '../components/common/PrimaryGrid';
import TemperatureBar from '../components/common/TemperatureBar';
import PostCard from '../components/PostCard';
import NotificationCard from '../components/UserProfile/NotificationCard';
import PrimaryModal from '../components/common/PrimaryModal';
import { useSearchUser } from '../hooks/query/useSearchUser';
import { useNotification } from '../hooks/query/useNotification';
import { useChangeUserInfo } from '../hooks/mutation/useChangeUserInfo';
import PrimaryText from '../components/common/PrimaryText';
import { isSameUser } from '../utils/isSameUser';
import { useHandleNotification } from '../hooks/mutation/useHandleNotification';
import { useFollow } from '../hooks/mutation/useFollow';
import { logout } from '../apis/auth';
import PrimaryAlertDialogSet from '../components/common/PrimaryAlertDialogSet';
import PrimaryContainer from '../components/common/PrimaryContainer';
import CircleIconBg from '../components/common/CircleIconBg';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Flex,
  Stack,
  Center,
  Box,
  Input,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

const UserProfile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserInfoContext();
  const toast = useToast();
  const [userImage, setUserImage] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMyInfo, setIsMyInfo] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure();
  const { userId } = useParams();
  const { getSearchUser: { data, error } = {} } = useSearchUser(userId);
  const {
    getNewNotification: { data: notificationData },
  } = useNotification();
  const { postProfileImage, putUserInfo } = useChangeUserInfo();
  const { postCreateNotification } = useHandleNotification();
  const { createPostFollow, deletePostFollow } = useFollow();

  const handleChange = (file: File) => {
    setUserImage(file);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        image: URL.createObjectURL(file),
      });
      toast({
        title: '변경 중!',
        description: '조금만 기다려주세요~',
        status: 'loading',
        duration: 2500,
        colorScheme: 'green',
      });
    }
  };

  const handleLogoutConfirm = async () => {
    onLogoutClose();
    setUserInfo(null);
    await logout();
    navigate('/');
  };

  const handleFollow = () => {
    if (userInfo && data) {
      if (isFollow) {
        const findIdIndex = data?.followers?.findIndex(
          (follow) => follow.follower === userInfo?._id
        );
        if (findIdIndex !== -1) {
          deletePostFollow.mutate(
            data.followers![findIdIndex!] as unknown as string
          );
        }
      } else {
        createPostFollow.mutate(data._id);
        postCreateNotification.mutate({
          notificationType: 'FOLLOW',
          notificationTypeId: userInfo!._id,
          userId: data._id,
          postId: null,
        });
      }
    }
  };

  useEffect(() => {
    if (userInfo && data) {
      isSameUser(userInfo._id, data._id) && setIsMyInfo(true);
      setIsFollow(
        data.followers!.some(({ follower }) => follower === userInfo._id)
      );
    }
  }, [data, userInfo]);

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
      <PrimaryAlertDialogSet
        bodyContentSentences={['로그아웃을 하시겠습니까?']}
        isOpen={isLogoutOpen}
        onClose={onLogoutClose}
        hasCancelButton
        hasOverlay
        handleConfirm={handleLogoutConfirm}
      />
      {data && notificationData ? (
        <>
          <PrimaryModal isOpen={isOpen} onClose={onClose}>
            <Box>
              {notificationData.length !== 0 ? (
                notificationData.map(
                  ({ _id, author: { fullName }, post, follow }) => (
                    <NotificationCard
                      _id={_id}
                      fullName={fullName}
                      router={post ?? follow}
                      key={_id}
                    />
                  )
                )
              ) : (
                <Center p="20px 0">아직 뭐가 없네요..</Center>
              )}
            </Box>
          </PrimaryModal>
          <PrimaryContainer>
            <PrimaryHeader>
              <Box flex={1} />
              <Flex gap="10px" fontSize="25px">
                {isMyInfo && (
                  <CircleIconBg onClick={onOpen}>
                    <MdNotifications />
                  </CircleIconBg>
                )}
              </Flex>
            </PrimaryHeader>
            <Stack spacing={4} align="center">
              <UploadImage
                borderRadius="full"
                handleOnChange={handleChange}
                isUploadDisable={!isMyInfo}
                boxSize={170}
                src={data.image ?? '../../src/assets/images/avatar_penguin.jpg'}
              />
              <Stack align="center" spacing={1}>
                <Flex align="center" fontSize="xl" gap="0.5em">
                  {isEdit ? (
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  ) : (
                    <PrimaryText as="b">{data.fullName}</PrimaryText>
                  )}
                  {isMyInfo && (
                    <AiFillEdit onClick={() => setIsEdit(!isEdit)} />
                  )}
                </Flex>
                <PrimaryText fontSize="sm" color="gray.500">
                  {data.email}
                </PrimaryText>
              </Stack>
              <TemperatureBar value={60} maxW="50%" />
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
                <Button px="3em" onClick={onLogoutOpen}>
                  로그아웃
                </Button>
              ) : (
                <PrimaryButton w="10em" onClick={handleFollow}>
                  {isFollow ? '언팔로우' : '팔로우'}
                </PrimaryButton>
              )}
              <Tabs w="90%" colorScheme="green">
                <TabList>
                  <Tab flex={1} fontSize="1.7rem">
                    <HamburgerIcon />
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px={0}>
                    <PrimaryGrid spacing={0}>
                      {data.posts.map(({ _id, title, image }) => (
                        <PostCard
                          post={{ _id, title, image }}
                          key={_id}
                          borderRadius="none"
                        />
                      ))}
                    </PrimaryGrid>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </PrimaryContainer>
        </>
      ) : null}
    </>
  );
};

export default UserProfile;
