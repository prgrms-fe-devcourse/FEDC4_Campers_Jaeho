import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, useColorMode } from '@chakra-ui/react';

const DarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Button
        variant="ghost"
        justifyContent="center"
        textAlign="center"
        onClick={toggleColorMode}
      >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Box>
  );
};

export default DarkMode;
