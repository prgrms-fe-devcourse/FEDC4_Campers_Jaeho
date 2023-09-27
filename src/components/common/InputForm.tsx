import { ChangeEvent, useState } from 'react';
import PrimaryButton from './PrimaryButton';
import { Box, Input, Center } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useComment } from '../../hooks/mutation/useComment';
import _ from 'lodash';

export const InputForm = ({ postId }: { postId: string }) => {
  const [newcomment, setNewcomment] = useState<string>('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewcomment(event.target.value);
  const { CreateCommnet } = useComment();
  const handleKeyDown = useCallback(
    _.debounce(
      (e) => {
        if (e.key === 'Enter') {
          CreateCommnet.mutate({
            postId: postId,
            comment: newcomment,
          });
          setNewcomment('');
        }
      },
      1000,
      { leading: true, trailing: false }
    ),
    []
  );

  const handleSubmit = () => {
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
          onClick={handleSubmit}
        >
          댓글달기!
        </PrimaryButton>
      </Box>
    </Box>
  );
};
