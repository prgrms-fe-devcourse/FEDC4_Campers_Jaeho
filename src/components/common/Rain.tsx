import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const Rain = () => {
  return (
    <Box bg="black">
      <CustomRain />
    </Box>
  );
};

export default Rain;

const rainDrop = keyframes`
  0% {
    box-shadow: 25px 0 white, 50px 0 white, 75px 0 white, 100px 0 white, 125px 0 white, 150px 0 white, 25px 0 white, 50px 0 white, 75px 0 white, 100px 0 white, 125px 0 white, 150px 0 white;
  }
  50% {
    box-shadow: 25px 20px white, 50px 60px rgba(255, 255, 255, 0), 75px 30px rgba(255, 255, 255, 0), 100px 70px rgba(255, 255, 255, 0), 125px 40px white, 150px 60px rgba(255, 255, 255, 0), 25px 20px white, 50px 30px white, 75px 10px white, 100px 30px white, 125px 30px rgba(255, 255, 255, 0), 150px 30px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 25px 60px rgba(255, 255, 255, 0), 50px 60px rgba(255, 255, 255, 0), 75px 50px rgba(255, 255, 255, 0), 100px 70px rgba(255, 255, 255, 0), 125px 70px rgba(255, 255, 255, 0), 150px 60px rgba(255, 255, 255, 0), 25px 80px rgba(255, 255, 255, 0), 50px 80px rgba(255, 255, 255, 0), 75px 70px rgba(255, 255, 255, 0), 100px 60px rgba(255, 255, 255, 0), 125px 30px rgba(255, 255, 255, 0), 150px 30px rgba(255, 255, 255, 0);
  }
`;

const CustomRain = styled.div`
  width: 500px;
  height: 300px;
  margin: 0 auto 20px;
  background-image: radial-gradient(
      circle 25px at 25px 25px,
      #fff 100%,
      transparent 0
    ),
    radial-gradient(circle 50px at 50px 50px, #fff 100%, transparent 0),
    radial-gradient(circle 25px at 25px 25px, #fff 100%, transparent 0),
    radial-gradient(circle 15px at 15px 15px, #fff 100%, transparent 0),
    linear-gradient(#fff 50px, transparent 0);
  background-size:
    50px 50px,
    100px 75px,
    50px 50px,
    30px 32px,
    136px 20px;
  background-repeat: no-repeat;
  background-position:
    0px 30px,
    30px 0px,
    113px 29px,
    147px 50px,
    23px 60px;
  position: relative;
  box-sizing: border-box;

  ::after {
    content: '';
    position: absolute;
    left: 2px;
    top: 65px;
    width: 2px;
    height: 6px;
    color: #fff;
    box-sizing: border-box;
    animation: ${rainDrop} 0.6s linear infinite;
  }
`;
