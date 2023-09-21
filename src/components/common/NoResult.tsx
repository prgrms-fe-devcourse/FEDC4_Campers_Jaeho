import PrimaryInfo from './PrimaryInfo';
import { Image, ImageProps } from '@chakra-ui/react';
const NoResult = ({ src }: ImageProps) => {
  return (
    <>
      <Image src={src} />
      <PrimaryInfo
        title="검색 결과가 없습니다..."
        subTitle="검색어가 정확한지 확인해보세요!"
      />
    </>
  );
};

export default NoResult;
