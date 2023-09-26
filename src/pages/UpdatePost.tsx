import { useForm } from 'react-hook-form';
import { useState } from 'react';
import PrimaryButton from '../components/common/PrimaryButton';
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Spacer,
  Textarea,
  Center,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import { ROUTES } from '../constants/routes';
import UploadImage from '../components/common/UploadImage';
//import { useLocation } from 'react-router-dom';

type PostData = {
  title: string;
  // 후기 json 추가 시 타입 지정 예정
};

const UpdatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostData>();
  const [selectImage, setSelectImage] = useState<File | null>(null);
  //const location = useLocation();
  //const { from } = location.state;
  const handleChange = (file: File) => {
    setSelectImage(file);
  };

  const onSubmit = (data: PostData) => {
    const formData = new FormData();
    if (data) {
      formData.append('title', data.title);
      formData.append('channelId', import.meta.env.VITE_MAIN_CHANNELID);
      selectImage && formData.append('image', selectImage);
      //mutation 추가
    }
  };
  //console.log(from);

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
        <FormControl mt={5} isInvalid={!!errors.title}>
          <FormLabel>제목</FormLabel>
          <Input
            placeholder="제목을 입력하세요."
            {...register('title', {
              required: 'title을 적어주세요.',
            })}
          />
          {errors.title && (
            <FormErrorMessage>{errors.title.message}</FormErrorMessage>
          )}
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

export default UpdatePost;
