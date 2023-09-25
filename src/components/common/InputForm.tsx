import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import { Box, Input, Center } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useUserInfoContext } from '../../contexts/UserInfoProvider';
import { useComment } from '../../hooks/mutation/useComment';
import _ from 'lodash';
export const InputForm = ({ postId, handleComment }) => {
  const [newcomment, setNewcomment] = useState<string>('');
  const handleChange = (event) => setNewcomment(event.target.value);
  const userInfo = useUserInfoContext();
  const { CreateCommnet } = useComment();
  const handleKeyDown = useCallback(
    _.debounce(
      (e) => {
        if (e.key === 'Enter') {
          handleComment(newcomment);

          CreateCommnet.mutateAsync({
            postId: postId,
            comment: newcomment,
          });
          console.log(newcomment, 'sent!!');
          setNewcomment('');
        }
      },
      1000,
      { leading: true, trailing: false }
    ),
    []
  );

  const handleSubmit = () => {
    console.log('send data', newcomment, userInfo?._id);
    handleComment(newcomment);
    CreateCommnet.mutateAsync({
      postId: postId,
      comment: newcomment,
    });
    setNewcomment('');
  };

  return (
    <Box bg="#ECE9E9" maxW="100%">
      <Center>
        <Input
          focusBorderColor="green.400"
          maxW="94%"
          height={101}
          borderRadius={5}
          bg="gray.100"
          onKeyDown={handleKeyDown}
          value={newcomment}
          onChange={handleChange}
        />
      </Center>
      <Box display="flex" justifyContent="flex-end" p="20px">
        <PrimaryButton
          width={82}
          height={35}
          borderRadius={5}
          handleClick={handleSubmit}
        >
          댓글달기!
        </PrimaryButton>
      </Box>
    </Box>
  );
};
