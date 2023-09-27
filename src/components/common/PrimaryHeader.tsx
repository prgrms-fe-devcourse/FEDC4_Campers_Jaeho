import { Flex, FlexProps } from '@chakra-ui/react';
import CircleIconBg from './CircleIconBg';
import PrimaryLink from './PrimaryLink';
import { ChevronLeftIcon } from '@chakra-ui/icons';

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
            <ChevronLeftIcon boxSize={8} />
          </CircleIconBg>
        </PrimaryLink>
      )}
      {children}
    </Flex>
  );
};

export default PrimaryHeader;
