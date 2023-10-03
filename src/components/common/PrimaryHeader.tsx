import { Flex, FlexProps } from '@chakra-ui/react';
import CircleIconBg from './CircleIconBg';
import PrimaryLink from './PrimaryLink';
import { IoIosArrowBack } from 'react-icons/io';

type PrimaryHeaderProps = FlexProps & {
  isShowBackBtn?: boolean;
};

const PrimaryHeader = ({
  children,
  isShowBackBtn = true,
  ...props
}: PrimaryHeaderProps) => {
  return (
    <Flex
      align="center"
      minH="80px"
      px="10px"
      pos="relative"
      gap="10px"
      {...props}
    >
      {isShowBackBtn && (
        <PrimaryLink router={-1} pos="absolute">
          <CircleIconBg>
            <IoIosArrowBack />
          </CircleIconBg>
        </PrimaryLink>
      )}
      {children}
    </Flex>
  );
};

export default PrimaryHeader;
