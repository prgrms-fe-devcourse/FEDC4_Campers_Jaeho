import { Flex, Progress, Text, ProgressProps } from '@chakra-ui/react';

type TemperatureBarProps = ProgressProps & {
  size?: string;
};

const TemperatureBar = ({ value, ...props }: TemperatureBarProps) => {
  return (
    <Flex align="center" maxW={value}>
      <Progress
        color="green.400"
        size="xs"
        value={value}
        w="100%"
        borderRadius={4}
        mr={1}
        {...props}
      />
      <Text color="green.400" fontSize={3}>
        {value}%
      </Text>
    </Flex>
  );
};

export default TemperatureBar;
