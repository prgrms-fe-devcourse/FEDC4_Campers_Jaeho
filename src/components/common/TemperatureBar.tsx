import { Flex, Progress, Text, ProgressProps } from '@chakra-ui/react';

type TemperatureBarProps = ProgressProps & {
  value: number;
  size?: string;
};

const TemperatureBar = ({
  value,
  size = 'xs',
  ...props
}: TemperatureBarProps) => {
  return (
    <Flex align="center" maxWidth={value}>
      <Progress
        {...props}
        colorScheme="green"
        size={size}
        value={value}
        width="100%"
        borderRadius="4"
        marginRight="1"
      />
      <Text color="green.400" fontSize="3">
        {value}%
      </Text>
    </Flex>
  );
};

export default TemperatureBar;
