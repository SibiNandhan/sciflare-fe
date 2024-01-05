import { Flex, Heading,Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
  }
  
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="1rem"
      backgroundColor="blue.500"
      color="white"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
    >
      <Heading as="h1" size="lg">
         Sciflare
      </Heading>
      <Box>
        {localStorage.getItem('token')  ? (
          <Button
            onClick={handleLogout}
            colorScheme="red"
            _hover={{ bg: 'red.400' }}
          >
            Logout
          </Button>
        ) : (
        <></>
        )}
      </Box>
    </Flex>
  );
}

export default Header;
