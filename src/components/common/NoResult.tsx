import PrimaryInfo from './PrimaryInfo';
import { Image, ImageProps } from '@chakra-ui/react';
const NoResult = ({ src }: ImageProps) => {
  return (
    <>
      <Image src={src} />
      <PrimaryInfo
        title="검색 결과가 없습니다..."
        subTitle="누구도 도달하지 못한 미지의 땅일지도 모르겠네요."
      />
    </>
  );
};

export default NoResult;
