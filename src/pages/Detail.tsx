// import {
//   Box,
//   Flex,
//   Image,
//   Stack,
//   Center,
//   Divider,
//   WrapItem,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   DrawerHeader,
//   DrawerBody,
//   Container,
//   useBoolean,
// } from '@chakra-ui/react';
// import Comment from '../components/common/Comment';
// import TemperatureBar from '../components/common/TemperatureBar';
// import PrimaryAvatar from '../components/common/PrimaryAvatar';
// import PrimaryButton from '../components/common/PrimaryButton';
// import RecommendButton from '../components/common/RecommendButton';
// import { formatDate } from '../utils/formateData';
// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import PrimaryText from '../components/common/PrimaryText';
// import { useDetailPost } from '../hooks/query/useDetailPost';
// import { InputForm } from '../components/common/InputForm';
// import { CommentInfo } from '../types/detail';
// import { v4 as uuidv4 } from 'uuid';
// import { useUserInfoContext } from '../contexts/UserInfoProvider';
// const Detail = () => {
//   const { postId } = useParams<{ postId: string }>();
//   const [isDrawerOpen, setIsDrawerOpen] = useBoolean();
//   const [comments, setComments] = useState<CommentInfo[]>([]);
//   const { data: { postInfo, commentInfo, likeInfo } = {}, isLoading } =
//     useDetailPost(postId);
//   const userInfo = useUserInfoContext();
//   const doesUserIdExist = (arr, id) => {
//     const foundUser = arr.find((item) => item.user === id);

//     return !!foundUser;
//   };
//   const handleComment = (newcomment: string): void => {
//     const Info = {
//       _id: uuidv4(),
//       fullName: userInfo?.fullName,
//       isOnline: userInfo?.isOnline,
//       image: userInfo?.image,
//     };
//     setComments([...comments, { comment: newcomment, ...Info }]);
//   };

//   const handleDelete = (commentId) => {
//     console.log(commentId);
//     if (commentId === userInfo?._id) {
//       alert('deldete');

//       deleteComment.mutateAsync({
//         postId: userInfo?._id,
//       });
//     }
//   };

//   return (
//     <Container maxW="100%" h="auto">
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <Box bg="#ECE9E9" maxW="100%" maxH="5%" p={5}>
//             <Image src={postInfo?.image} maxW="100%" maxH="5%" />
//             <Flex justifyContent="space-between">
//               <Box>
//                 <Stack spacing={2}>
//                   <PrimaryText
//                     fontSize={15}
//                     children={formatDate(postInfo?.updatedAt)}
//                   />
//                   <WrapItem>
//                     <PrimaryAvatar
//                       userId={postInfo?._id}
//                       size={'sm'}
//                       name={postInfo?.fullName}
//                       src={postInfo?.authorImage}
//                       isOnline={postInfo?.isOnline}
//                     />
//                     <Box>
//                       <PrimaryText
//                         fontSize={15}
//                         children={postInfo?.fullName}
//                       />
//                       <TemperatureBar value={80} />
//                     </Box>
//                   </WrapItem>
//                 </Stack>
//               </Box>
//               <Box>
//                 <RecommendButton
//                   recommendCount={likeInfo?.length}
//                   isRecommended={doesUserIdExist(likeInfo, userInfo?._id)}
//                   bg="#D3DCDE"
//                   width={20}
//                   height={30}
//                   top={10}
//                   size={'lg'}
//                   postId={postId}
//                 />
//               </Box>
//             </Flex>
//           </Box>
//           <Box bg="#ECE9E9" maxW="100%" maxH="5%" p={5}>
//             <PrimaryText
//               maxW="80%"
//               h={238}
//               fontSize={20}
//               children={postInfo?.description}
//             />
//           </Box>

//           <Divider bg="gray.100" />
//           <Box bg="#ECE9E9" maxW="100%" maxH="5%" p={4}>
//             <Box>
//               {commentInfo
//                 ?.slice(0, 3)
//                 .map((comment) => (
//                   <Comment
//                     comment={comment.comment}
//                     image={comment.image}
//                     isOnline={comment.isOnline}
//                     name={comment.fullName}
//                     userId={comment._id}
//                     handleDelete={handleDelete}
//                   />
//                 ))}
//             </Box>
//             <Center>
//               <PrimaryButton
//                 alignSelf="center"
//                 width={82}
//                 height={35}
//                 borderRadius={5}
//                 onClick={setIsDrawerOpen.on}
//                 disabled={isDrawerOpen}
//               >
//                 더 보기
//               </PrimaryButton>
//               <Drawer
//                 placement="bottom"
//                 isOpen={isDrawerOpen}
//                 onClose={setIsDrawerOpen.off}
//                 size="xs"
//               >
//                 <DrawerOverlay />
//                 <DrawerContent>
//                   <DrawerCloseButton />
//                   <DrawerHeader>댓글</DrawerHeader>
//                   <DrawerBody>
//                     {commentInfo?.map((comment) => (
//                       <Comment
//                         comment={comment.comment}
//                         image={comment.image}
//                         isOnline={comment.isOnline}
//                         name={comment.fullName}
//                         userId={comment._id}
//                         handleDelete={handleDelete}
//                       />
//                     ))}
//                   </DrawerBody>
//                 </DrawerContent>
//               </Drawer>
//             </Center>
//           </Box>
//           <Box bg="#ECE9E9" maxW="100%">
//             <InputForm postId={postId} handleComment={handleComment} />
//           </Box>
//         </>
//       )}
//     </Container>
//   );
// };
// export default Detail;
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDetailPost } from '../hooks/query/useDetailPost';
import { useComment } from '../hooks/mutation/useComment';
import { usePost } from '../hooks/mutation/usePost';
import { useUserInfoContext } from '../contexts/UserInfoProvider';
import { ROUTES } from '../constants/routes';
import PrimaryButton from '../components/common/PrimaryButton';
import PrimaryContainer from '../components/common/PrimaryContainer';
import CircleIconBg from '../components/common/CircleIconBg';
import PrimaryAvatar from '../components/common/PrimaryAvatar';
import TemperatureBar from '../components/common/TemperatureBar';
import PrimaryLink from '../components/common/PrimaryLink';
import { Box, Flex, Stack, Text, Textarea } from '@chakra-ui/react';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import { GrFormPrevious } from 'react-icons/gr';
import { AiOutlineClose } from 'react-icons/ai';

const Detail = () => {
  const { userInfo } = useUserInfoContext();
  const { postId } = useParams<{ postId: string }>();
  const { data: { postInfo, commentInfo, likeInfo } = {} } =
    useDetailPost(postId);
  const [isILike, setIsILike] = useState(false);
  const { DeletePost } = usePost();
  const { CreateCommnet, DeleteComment } = useComment();

  const handleDeletePost = (_id: string) => DeletePost.mutate(_id);
  const handleDeleteComment = (_id: string) => DeleteComment.mutate(_id);
  const handleCreateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo || !postId) return;
    const textarea = e.target.querySelector('textarea');
    const comment = textarea.value;
    CreateCommnet.mutate({ comment, postId });
    textarea.value = '';
  };

  useEffect(() => {
    if (userInfo && likeInfo) {
      const isAreadyLike = likeInfo.some(({ user }) => user === userInfo._id);
      setIsILike(isAreadyLike);
    }
  }, [likeInfo]);

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
              <PrimaryLink router={-1} pos="absolute">
                <CircleIconBg _hover={{ bgColor: 'rgba(255,255,255,0.5)' }}>
                  <GrFormPrevious fontSize="25px" />
                </CircleIconBg>
              </PrimaryLink>
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
                  <Flex
                    bgColor="gray.100"
                    align="center"
                    p="10px 15px"
                    borderRadius="30px"
                  >
                    <Box
                      fontSize="20px"
                      color={isILike ? '#DF8D58' : 'none'}
                      onClick={() =>
                        handleLike(postInfo._id, postInfo.authorId)
                      }
                    >
                      {isILike ? <AiTwotoneLike /> : <AiOutlineLike />}
                    </Box>
                    <Text ml="10px" fontWeight="bold">
                      {likeInfo?.length}
                    </Text>
                  </Flex>
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
                        <Flex py="10px" pos="relative" key={_id}>
                          <PrimaryLink router={ROUTES.USER_INFO(author_id)}>
                            <PrimaryAvatar
                              src={
                                image ??
                                '../../src/assets/images/avatar_dear.jpg'
                              }
                              isOnline={!!isOnline}
                              boxSize="40px"
                              mr="15px"
                              transition="all 0.1s"
                              _hover={{ border: '2px solid #28B67E' }}
                            />
                          </PrimaryLink>
                          <Stack flex={1}>
                            <Text fontWeight="bold">{fullName}</Text>
                            <Text>{comment}</Text>
                          </Stack>
                          <Flex
                            w="50px"
                            h="100%"
                            justify="center"
                            fontSize="24"
                          >
                            {userInfo?._id === author_id && (
                              <Box
                                color="gray.500"
                                _hover={{ color: 'black' }}
                                onClick={() => handleDeleteComment(_id)}
                              >
                                <AiOutlineClose />
                              </Box>
                            )}
                          </Flex>
                        </Flex>
                      )
                    )}
                  </Stack>
                  {/* 댓글폼 */}
                  {userInfo ? (
                    <form onSubmit={handleCreateComment}>
                      <Stack>
                        <Textarea
                          placeholder="착한 마음 착한 말"
                          minH="100px"
                        />
                        <PrimaryButton type="submit">댓글달기</PrimaryButton>
                      </Stack>
                    </form>
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
