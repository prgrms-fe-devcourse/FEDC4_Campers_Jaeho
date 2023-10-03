import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
import CircleIconBg from './CircleIconBg';

const DarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <CircleIconBg onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </CircleIconBg>
  );
};

export default DarkMode;
