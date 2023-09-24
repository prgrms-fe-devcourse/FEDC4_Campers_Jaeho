import PrimaryInfo from './PrimaryInfo';
import { Image, ImageProps, Text, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const NoResult = ({ src }: ImageProps) => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center">
      <Image src={src} />
      <PrimaryInfo
        title="검색 결과가 없습니다..."
        subTitle="검색어가 정확한지 확인해보세요!"
        mb={6}
      />
      <Text color="green.400" as="b" onClick={() => navigate('/createpost')}>
        이 곳에 대한 첫 글 남기기
      </Text>
    </Box>
  );
};

export default NoResult;
