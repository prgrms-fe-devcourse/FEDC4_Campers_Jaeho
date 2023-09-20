import { useForm } from 'react-hook-form';
import { useState } from 'react';
import PrimaryButton from './common/PrimaryButton';
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Spacer,
  Textarea,
  Center,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import PrimaryHeader from './common/PrimaryHeader';
import PrimaryLink from './common/PrimaryLink';
import { ROUTES } from '../constants/routes';
import { useQueryPost } from '../hooks/useQueryPost';
import UploadImage from '../components/common/UploadImage';

type PostForm = {
  title: string;
  // 후기 json 추가 시 타입 지정 예정
};

const CreatePost = () => {
  const { register, handleSubmit } = useForm<PostForm>();
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const { createPoster } = useQueryPost();

  const handleChange = (file: File) => {
    setSelectImage(file);
  };

  const onSubmit = (data: PostForm) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('channelId', import.meta.env.VITE_MAIN_CHANNELID);
    if (selectImage) {
      formData.append('image', selectImage);
    }
    createPoster.mutate(formData);
  };

  return (
    <>
      <PrimaryHeader>
        <PrimaryLink router={ROUTES.MAIN} width={5}>
          <ChevronLeftIcon boxSize={10} />
        </PrimaryLink>
        <Spacer />
        <Text as="b" fontSize="2xl">
          후기작성
        </Text>
        <Spacer />
      </PrimaryHeader>
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl mt={5}>
          <FormLabel>제목</FormLabel>
          <Input
            type="text"
            placeholder="제목을 입력하세요."
            {...register('title')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>여행지</FormLabel>
          <PrimaryButton w="180px">카카오맵 불러오기</PrimaryButton>
        </FormControl>
        <FormControl>
          <FormLabel>후기</FormLabel>
          <Textarea />
        </FormControl>
        <FormControl>
          <UploadImage handleOnChange={handleChange} />
        </FormControl>
        <Center>
          <PrimaryButton type="submit" w="200px">
            글 올리기
          </PrimaryButton>
        </Center>
      </Stack>
    </>
  );
};

export default CreatePost;
