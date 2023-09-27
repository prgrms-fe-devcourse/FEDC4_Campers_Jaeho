import { useParams } from 'react-router-dom';
import { useDetailPost } from '../hooks/query/useDetailPost';
import { usePost } from '../hooks/mutation/usePost';
import { useUserInfoContext } from '../contexts/UserInfoProvider';
import { ROUTES } from '../constants/routes';
import PrimaryButton from '../components/common/PrimaryButton';
import PrimaryContainer from '../components/common/PrimaryContainer';
import CircleIconBg from '../components/common/CircleIconBg';
import PrimaryAvatar from '../components/common/PrimaryAvatar';
import TemperatureBar from '../components/common/TemperatureBar';
import PrimaryLink from '../components/common/PrimaryLink';
import RecommendButton from '../components/common/RecommendButton';
import Comment from '../components/common/Comment';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { InputForm } from '../components/common/InputForm';
import PrimaryHeader from '../components/common/PrimaryHeader';

const Detail = () => {
  const { userInfo } = useUserInfoContext();
  const { postId } = useParams<{ postId: string }>();
  const { data: { postInfo, commentInfo, likeInfo } = {} } =
    useDetailPost(postId);
  const { DeletePost } = usePost();

  const handleDeletePost = (_id: string) => DeletePost.mutate(_id);

  return (
    <>
      <PrimaryContainer pb="30px">
        {postInfo ? (
          <>
            <Box
              w="100%"
              height="300px"
              bgImg={postInfo.image ?? '../src/assets/images/no_image.png'}
              bgRepeat="no-repeat"
              bgSize="cover;"
              bgPosition="center"
              borderBottomRadius="10px"
              boxShadow="xl"
              p="10px"
            >
              <PrimaryHeader />
            </Box>

            <Stack p="20px">
              <Stack borderBottom="1px solid #eee">
                <Text color="gray.500">{postInfo.updatedAt.slice(0, 10)}</Text>
                <Flex align="center">
                  <Text
                    fontWeight="bold"
                    fontSize="28px"
                    flex={1}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {postInfo.title}
                  </Text>
                  {likeInfo && (
                    <RecommendButton
                      postId={postId || ''}
                      likeInfo={likeInfo}
                      isRecommended={
                        !!(likeInfo?.findIndex(
                          (idx) => idx.user === userInfo?._id
                        ) >= 0
                          ? true
                          : false)
                      }
                    />
                  )}
                </Flex>
                <Flex mb="10px">
                  <PrimaryLink
                    router={ROUTES.USER_INFO(postInfo.authorId)}
                    display="flex"
                    p="10px"
                    borderRadius="20px"
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{ bgColor: 'gray.200' }}
                  >
                    <PrimaryAvatar
                      src={postInfo.authorImage ?? 'https://bit.ly/dan-abramov'}
                      isOnline={!!postInfo?.isOnline}
                      boxSize="40px"
                      mr="10px"
                    />
                    <Stack spacing={0}>
                      <Text fontSize="15px">{postInfo?.fullName}</Text>
                      <TemperatureBar
                        value={50}
                        w="120px"
                        justify="flexStart"
                      />
                    </Stack>
                  </PrimaryLink>
                </Flex>
              </Stack>
              <Stack py="10px">
                <Text whiteSpace="pre-line">{postInfo.description}</Text>
              </Stack>
              {userInfo?._id === postInfo.authorId && (
                <>
                  <Flex
                    gap="10px"
                    justify="flex-end"
                    borderBottom="1px solid #eee"
                    py="10px"
                    fontSize="14px"
                    color="gray.500"
                  >
                    <CircleIconBg
                      w="60px"
                      borderRadius="30px "
                      onClick={() => handleDeletePost(postInfo._id)}
                    >
                      <Text>삭제</Text>
                    </CircleIconBg>
                  </Flex>
                </>
              )}
              {commentInfo ? (
                <>
                  <Stack>
                    <Text py="10px" fontWeight="bold">
                      댓글
                    </Text>
                    {commentInfo.map(
                      ({
                        _id,
                        comment,
                        author_id,
                        fullName,
                        isOnline,
                        image,
                      }) => (
                        <Comment
                          userInfo={userInfo}
                          comment={comment}
                          image={image}
                          isOnline={!!isOnline}
                          fullName={fullName}
                          _id={_id}
                          key={_id}
                          author_id={author_id}
                        />
                      )
                    )}
                  </Stack>
                  {userInfo ? (
                    <>
                      <InputForm postId={postId ? postId : ''} />
                    </>
                  ) : (
                    <Stack>
                      <PrimaryLink router={ROUTES.AUTH}>
                        <PrimaryButton w="100%">
                          나도 로그인 후 댓글달기!
                        </PrimaryButton>
                      </PrimaryLink>
                    </Stack>
                  )}
                </>
              ) : (
                <></>
              )}
            </Stack>
          </>
        ) : (
          <></>
        )}
      </PrimaryContainer>
    </>
  );
};
export default Detail;
