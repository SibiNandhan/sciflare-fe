import React, { useState ,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Box,
  Heading,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useNavigate();
  const toast = useToast(); 


  const submitHandle = async () => {
    try {
      if(!email || !password){
        toast({
          title: 'Fill all required Credentials',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      else{
        const response = await axios.post('/api/v1/auth/login', {
          email,
          password
        });
        
  
        if (response.data.token) {
          await localStorage.setItem('token',response.data.token);
          toast({
            title: 'Login successful',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
            history('/employees'); 
        } else {
          toast({
            title: 'Login failed. Please check your credentials.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
  
    } catch (error) {
      toast({
        title: 'Login failed. Please check your credentials.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="4" width="300px" margin="0 auto">
      <Heading as="h2" size="lg" mb="4">
        Login
      </Heading>
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb="3"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb="3"
      />
      <Button colorScheme="teal" onClick={submitHandle}>
        Log In
      </Button>
    </Box>
  );
};

export default Login;
