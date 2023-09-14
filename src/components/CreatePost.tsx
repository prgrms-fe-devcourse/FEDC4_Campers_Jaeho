import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreatePoster } from '../apis/poster';
import PrimaryButton from './common/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Image,
  Flex,
  Spacer,
  Textarea,
  Center,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  PlusSquareIcon,
  SmallCloseIcon,
} from '@chakra-ui/icons';

export interface NewPostData {
  title: string;
  image: FileImage[];
  channelId: string;
}

export interface FileImage {
  id: string;
  file: File;
}

const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm<NewPostData>();
  const [selectedImages, setSelectedImages] = useState<FileImage[]>([]); // File 배열 형태로 선택한 파일들이 저장
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/');
  };

  const onSubmit = async (data: NewPostData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('channelId', import.meta.env.VITE_MAIN_CHANNELID);

    if (selectedImages[0]) {
      formData.append('image', selectedImages[0].file);
    }

    try {
      const response = await CreatePoster(formData);

      setSelectedImages([]);
      reset();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveImage = (id: string) => {
    setSelectedImages(selectedImages.filter((image) => image.id !== id));
  };

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files) {
      const newFilesArray = Array.from(event.target.files).map((file) => ({
        id: uuidv4(),
        file,
      }));
      if (newFilesArray.length + selectedImages.length > 5) {
        alert('최대 5개의 이미지만 업로드 할 수 있습니다.');
        return;
      }
      setSelectedImages((prev) => [...prev, ...newFilesArray]);
    }
    event.target.value = '';
  };

  const handleAddFile = () => {
    const inputRef = register('image').ref as unknown as HTMLInputElement;
    inputRef?.click();
  };

  return (
    <>
      <Flex>
        <ChevronLeftIcon boxSize={10} onClick={handlePrev} />
        <Spacer />
        <Text as="b" fontSize="2xl">
          후기작성
        </Text>
        <Spacer />
      </Flex>
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
          <Flex gap={5} overflow="hidden">
            {selectedImages.length ? (
              selectedImages.map(({ id, file }) => (
                <Flex key={id}>
                  <Image boxSize="150px" src={URL.createObjectURL(file)} />
                  <SmallCloseIcon onClick={() => handleRemoveImage(id)} />
                </Flex>
              ))
            ) : (
              <Image src="https://via.placeholder.com/150" />
            )}
          </Flex>
          <FormLabel>사진 (최대5개)</FormLabel>
          <Input
            type="file"
            accept="image/*"
            multiple
            display="none"
            {...register('image')}
            onChange={handleFileSelect}
          />
          <PlusSquareIcon boxSize={8} onClick={handleAddFile} />
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
