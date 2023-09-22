import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useQueryPost } from '../hooks/useQueryPost';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import UploadImage from '../components/common/UploadImage';
import PrimaryButton from '../components/common/PrimaryButton';

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const { createPoster } = useQueryPost();

  const handleChange = (file: File) => {
    setPostImage(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (postTitle) {
      formData.append('title', postTitle);
      formData.append('channelId', import.meta.env.VITE_MAIN_CHANNELID);
      postImage && formData.append('image', postImage);
      createPoster.mutate(formData);
    } else {
      alert('타이틀을 입력해주세요');
    }
  };

  return (
    <Container mt={5}>
      <PrimaryHeader w="100%" mb={5}>
        <PrimaryLink router={'/'}>
          <ChevronLeftIcon boxSize={10} />
        </PrimaryLink>
        <Spacer />
        <Text as="b" fontSize="2xl">
          후기작성
        </Text>
        <Spacer />
      </PrimaryHeader>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              placeholder="제목을 입력하세요"
              value={postTitle}
              onChange={(event) => setPostTitle(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>후기</FormLabel>
            <Textarea />
          </FormControl>
          <UploadImage handleOnChange={handleChange} />
          <PrimaryButton type="submit" w="200px">
            글 올리기
          </PrimaryButton>
        </Stack>
      </form>
    </Container>
  );
};

export default CreatePost;
