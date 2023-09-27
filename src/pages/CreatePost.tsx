import {
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useCreatePost } from '../hooks/mutation/useCreatePost';
import UploadImage from '../components/common/UploadImage';
import PrimaryButton from '../components/common/PrimaryButton';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryContainer from '../components/common/PrimaryContainer';
import Loading from '../components/common/Loading';

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const { createPost, isLoading } = useCreatePost();

  const handleChange = (file: File) => {
    setPostImage(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (postTitle) {
      formData.append(
        'title',
        JSON.stringify({ title: postTitle, description })
      );
      formData.append('channelId', import.meta.env.VITE_MAIN_CHANNELID);
      postImage && formData.append('image', postImage);
      createPost.mutate(formData);
    } else {
      alert('타이틀을 입력해주세요');
    }
  };

  if (isLoading) {
    return <Loading pos="fixed" top="50%" left="50%" w="100vw" h="100vh" />;
  }

  return (
    <PrimaryContainer>
      <PrimaryHeader>
        <Spacer />
        <Text as="b" fontSize="20px">
          후기작성
        </Text>
        <Spacer />
      </PrimaryHeader>
      <Stack p="20px">
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
              <Textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                minH="250px"
                h="auto"
              />
            </FormControl>
            <UploadImage handleOnChange={handleChange} />
            <PrimaryButton type="submit" w="200px">
              글 올리기
            </PrimaryButton>
          </Stack>
        </form>
      </Stack>
    </PrimaryContainer>
  );
};

export default CreatePost;
