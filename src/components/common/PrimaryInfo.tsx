import { Stack, Text } from '@chakra-ui/react';

const PrimaryInfo = ({
  title = '',
  subTitle = '',
  titleSize = 'lg',
  subTitleSize = 'xs',
  ...props
}) => {
  return (
    <Stack textAlign="center" spacing={2} {...props}>
      <Text as="b" fontSize={titleSize}>
        {title}
      </Text>
      <Text color="blackAlpha.600" fontSize={subTitleSize}>
        {subTitle}
      </Text>
    </Stack>
  );
};

export default PrimaryInfo;
