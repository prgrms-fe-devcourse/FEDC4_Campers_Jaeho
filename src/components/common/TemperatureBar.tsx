import { Flex, Progress, Text, ProgressProps } from '@chakra-ui/react';

type TemperatureBarProps = ProgressProps & {
  fontSize?: string;
  justify?: string;
};

const TemperatureBar = ({
  value,
  fontSize = '12px',
  justify = 'center',
  ...props
}: TemperatureBarProps) => {
  return (
    <Flex align="center" justify={justify} w="100%">
      <Progress
        colorScheme="green"
        size="sm"
        value={value}
        w="100%"
        borderRadius={4}
        mr={3}
        {...props}
      />
      <Text color="green.400" fontWeight="bold" fontSize={fontSize}>
        {value}%
      </Text>
    </Flex>
  );
};

export default TemperatureBar;
