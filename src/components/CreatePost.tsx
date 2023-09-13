import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreatePoster } from '../apis/poster';
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Container,
  Stack,
  Image,
  Flex,
  Spacer,
  Button,
  Center,
  Textarea,
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
  const [loadedMap, setLoadedMap] = useState<boolean>(false);

  const handlePrev = () => {
    console.log('이전화면으로 이동하는 버튼으로 구현');
  };

  const onSubmit = async (data: NewPostData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('channelId', '64fbfdabe8468d1ed414e307');

    if (selectedImages[0]) {
      formData.append('image', selectedImages[0].file);
    }

    try {
      const response = await CreatePoster(formData);

      setSelectedImages([]);
      reset();
      console.log(response);
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
      // FileList 객체 반환
      const newFilesArray = Array.from(event.target.files).map((file) => ({
        id: uuidv4(),
        file,
      })); // 지금 담은 이미지들
      if (newFilesArray.length + selectedImages.length > 5) {
        alert('최대 5개의 이미지만 업로드 할 수 있습니다.');
        return;
      }
      setSelectedImages([...selectedImages, ...newFilesArray]);
    }
    event.target.value = ''; //똑같은 파일을 올려도 지장이 없도록
  };

  const handleAddFile = () => {
    (document.querySelector('input[type="file"]') as HTMLInputElement).click();
  };

  return (
    <Container maxW="container.sm" mt="5">
      <Flex>
        <ChevronLeftIcon boxSize={10} onClick={handlePrev} />
        <Spacer />
        <Text as="b" fontSize="2xl">
          후기작성
        </Text>
        <Spacer />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
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
            <Button onClick={() => setLoadedMap(!loadedMap)}>
              카카오맵 불러오기
            </Button>
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
            <Button type="submit" w="200px">
              눌러봐
            </Button>
          </Center>
        </Stack>
      </form>
    </Container>
  );
};

export default CreatePost;
