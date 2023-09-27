import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';

const DarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);

  return (
    <Button variant="ghost" onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default DarkMode;
