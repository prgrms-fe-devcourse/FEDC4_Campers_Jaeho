import { useState, ChangeEvent } from 'react';
import PrimaryButton from './PrimaryButton';
import { Box, Input } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useComment } from '../../hooks/mutation/useComment';
import _ from 'lodash';

type InputFormProps = {
  postId: string;
};

export const InputForm = ({ postId }: InputFormProps) => {
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
    <Box w="100%">
      <Input
        minH="100px"
        placeholder="착한 마음 착한 말"
        onKeyDown={handleKeyDown}
        value={newcomment}
        onChange={handleChange}
      />
      <PrimaryButton w="100%" onClick={handleSubmit}>
        댓글달기!
      </PrimaryButton>
    </Box>
  );
};
