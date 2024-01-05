import React from 'react';
import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const history = useNavigate();
  const redirectToLogin = () => {
    history('/login')
  };

  const redirectToSignup = () => {
    history('/signup')
  };

  const redirectToOrgSignup = () => {
    history('/org/signup')
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box width="400px" p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Welcome
        </Heading>
        <Button colorScheme="teal" size="lg" mb={4} mr={50} onClick={redirectToLogin}>
          Login
        </Button>
        <Button colorScheme="blue" size="lg" mb={4} ml={50} onClick={redirectToSignup}>
          Signup
        </Button>
        <Button colorScheme="green" size="lg" mt={4} ml={30} onClick={redirectToOrgSignup}>
          Create New Organization
        </Button>
      </Box>
    </Flex>
  );
};

export default Home;
