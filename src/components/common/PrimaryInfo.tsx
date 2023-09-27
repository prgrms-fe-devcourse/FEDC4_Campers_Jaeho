import { Stack, Text, useColorModeValue } from '@chakra-ui/react';

const PrimaryInfo = ({
  title = '',
  subTitle = '',
  titleSize = 'lg',
  subTitleSize = 'xs',
  ...props
}) => {
  const textColor = useColorModeValue('blackAlpha.600', 'white');

  return (
    <Stack textAlign="center" spacing={2} {...props}>
      <Text as="b" fontSize={titleSize}>
        {title}
      </Text>
      <Text color={textColor} fontSize={subTitleSize}>
        {subTitle}
      </Text>
    </Stack>
  );
};

export default PrimaryInfo;
