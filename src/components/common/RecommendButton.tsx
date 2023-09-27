// import { useState } from 'react';
// import { Button, ButtonProps, Text, Icon } from '@chakra-ui/react';
// import { MdThumbUp } from 'react-icons/md';
// import { useRecommend } from '../../hooks/mutation/useRecommend';
// type RecommendButtonProps = ButtonProps & {
//   postId: string;
//   recommendCount: number;
//   isRecommended: boolean;
// };

// const RecommendButton = ({
//   postId,
//   recommendCount,
//   isRecommended,
//   ...props
// }: RecommendButtonProps) => {
//   const [count, setCount] = useState(recommendCount);
//   const [isClicked, setIsClicked] = useState(isRecommended);
//   const { createRecommend, deleteRecommend } = useRecommend();
//   const handleToggleClicked = async () => {
//     if (isClicked) {
//       setCount((prev) => prev - 1);
//       setIsClicked(false);
//       deleteRecommend.mutate(postId);
//     } else {
//       setCount((prev) => prev + 1);
//       setIsClicked(true);
//       createRecommend.mutate(postId);
//     }
//   };

//   return (
//     <Button {...props} onClick={handleToggleClicked}>
//       <Icon as={MdThumbUp} color={isClicked ? 'orange' : 'black'} mr={2} />
//       <Text>{count}</Text>
//     </Button>
//   );
// };

// export default RecommendButton;

// import { useState, useEffect } from 'react';
// import { Button, ButtonProps, Text, Icon } from '@chakra-ui/react';
// import { MdThumbUp } from 'react-icons/md';
// import { useRecommend } from '../../hooks/mutation/useRecommend';
// import { useNotification } from '../../hooks/query/useNotification';
// import { useUserInfoContext } from '../../contexts/UserInfoProvider';
// import { LikeResponse } from '../../types/post';
// type RecommendButtonProps = ButtonProps & {
//   postId: string;
//   isRecommended: boolean;
//   likeInfo?: LikeResponse[];
// };

// const RecommendButton = ({
//   likeInfo,
//   postId,
//   isRecommended,
//   ...props
// }: RecommendButtonProps) => {
//   const [count, setCount] = useState(likeInfo?.length ? likeInfo.length : 0);
//   const [isClicked, setIsClicked] = useState(isRecommended);
//   const { createRecommend, deleteRecommend } = useRecommend();
//   const { createNewNotification } = useNotification();
//   const { userInfo } = useUserInfoContext();
//   console.log(likeInfo?.length);
//   const handleToggleClicked = () => {
//     if (
//       createRecommend.isLoading ||
//       deleteRecommend.isLoading ||
//       createRecommend.isError ||
//       deleteRecommend.isError
//     )
//       return;
//     const idx = likeInfo?.findIndex((idx) => idx.user === userInfo?._id);
//     if (isClicked === true && idx !== undefined && likeInfo !== undefined) {
//       setCount(count - 1);
//       console.log(isClicked);
//       deleteRecommend.mutate(likeInfo[idx]._id);
//       if (likeInfo[idx] !== null && userInfo !== null) {
//         createNewNotification.mutate({
//           notificationType: 'LIKE',
//           notificationTypeId: likeInfo[idx].user,
//           userId: userInfo._id,
//           postId: postId,
//         });
//       }
//       setIsClicked(false);
//     } else {
//       setCount(count + 1);
//       if (
//         likeInfo &&
//         idx !== undefined &&
//         likeInfo[idx] !== null &&
//         userInfo !== null
//       ) {
//         createRecommend.mutate(postId);
//         createNewNotification.mutate({
//           notificationType: 'LIKE',
//           notificationTypeId: likeInfo[idx].user,
//           userId: userInfo._id,
//           postId: postId,
//         });
//       }
//       setIsClicked(true);
//     }
//   };
//   useEffect(() => {}, []); // The empty array [] means this effect only runs once, similar to componentDidMount

//   return (
//     <Button {...props} onClick={userInfo ? handleToggleClicked : undefined}>
//       <Icon as={MdThumbUp} color={isClicked ? 'orange' : 'black'} mr={2} />
//       <Text>{count}</Text>
//     </Button>
//   );
// };

// export default RecommendButton;
