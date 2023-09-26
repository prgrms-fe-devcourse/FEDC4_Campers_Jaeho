import { Flex, FlexProps } from '@chakra-ui/react';
import { GrFormPrevious } from 'react-icons/gr';
import CircleIconBg from './CircleIconBg';
import PrimaryLink from './PrimaryLink';

type PrimaryHeaderProps = FlexProps & {
  isShowBackBtn?: boolean;
};

const PrimaryHeader = ({
  children,
  isShowBackBtn = true,
  ...props
}: PrimaryHeaderProps) => {
  return (
    <Flex align="center" minH="60px" p="10px" pos="relative" {...props}>
      {isShowBackBtn && (
        <PrimaryLink router={-1} pos="absolute">
          <CircleIconBg>
            <GrFormPrevious fontSize="25px" />
          </CircleIconBg>
        </PrimaryLink>
      )}
      {children}
    </Flex>
  );
};

export default PrimaryHeader;
