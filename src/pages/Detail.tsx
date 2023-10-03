import { useParams } from 'react-router-dom';
import { useDetailPost } from '../hooks/query/useDetailPost';
import { useUserInfoContext } from '../contexts/UserInfoProvider';
import { ROUTES } from '../constants/routes';
import PrimaryButton from '../components/common/PrimaryButton';
import PrimaryContainer from '../components/common/PrimaryContainer';
import PrimaryAvatar from '../components/common/PrimaryAvatar';
import TemperatureBar from '../components/common/TemperatureBar';
import PrimaryLink from '../components/common/PrimaryLink';
import RecommendButton from '../components/common/RecommendButton';
import PrimaryHeader from '../components/common/PrimaryHeader';
import { InputForm } from '../components/common/InputForm';
import Comment from '../components/common/Comment';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import MoreText from '../components/Post/MoreText';

const Detail = () => {
  const { userInfo } = useUserInfoContext();
  const { postId } = useParams<{ postId: string }>();
  const { data: { postInfo, commentInfo, likeInfo } = {} } =
    useDetailPost(postId);

  return (
    <>
      <PrimaryContainer pb="30px">
        {postInfo && (
          <>
            <Box
              w="100%"
              h="300px"
              p="10px"
              bgImg={postInfo.image ?? '../src/assets/images/no_image.png'}
              bgRepeat="no-repeat"
              bgSize="cover;"
              bgPosition="center"
              borderBottomRadius="10px"
              boxShadow="xl"
            >
              <PrimaryHeader />
            </Box>
            <Stack p="20px">
              <Stack pb="1px solid #eee">
                <Text color="gray.500">{postInfo.updatedAt.slice(0, 10)}</Text>
                <Flex align="center">
                  <Text
                    fontWeight="bold"
                    fontSize="24px"
                    flex={1}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    wordBreak="break-word"
                    whiteSpace="nowrap"
                  >
                    {postInfo.title}
                  </Text>
                  {likeInfo && (
                    <RecommendButton
                      postId={postId || ''}
                      likeInfo={likeInfo}
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
                    _hover={{ bgColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <PrimaryAvatar
                      src={postInfo.authorImage}
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
              <MoreText startingHeight="160px">
                <Text whiteSpace="pre-line">{postInfo.description}</Text>
              </MoreText>
              {userInfo?._id === postInfo.authorId && (
                <Flex py="10px" justify="end" borderBottom="1px solid gray">
                  <PrimaryButton
                    p="0"
                    h="30px"
                    w="60px"
                    fontSize="12px"
                    my={0}
                    bgColor="gray"
                    color="white"
                    _hover={{
                      bgColor: 'red',
                    }}
                  >
                    삭제
                  </PrimaryButton>
                </Flex>
              )}
              {commentInfo && (
                <>
                  <Stack>
                    <Text py="10px" fontWeight="bold">
                      댓글 {commentInfo.length}개
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
                    <InputForm postId={postId ? postId : ''} />
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
              )}
            </Stack>
          </>
        )}
      </PrimaryContainer>
    </>
  );
};
export default Detail;
