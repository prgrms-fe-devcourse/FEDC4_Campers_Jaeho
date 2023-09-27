import { MoonIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';

const DarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button variant="ghost" leftIcon={<MoonIcon />} onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
};

export default DarkMode;
