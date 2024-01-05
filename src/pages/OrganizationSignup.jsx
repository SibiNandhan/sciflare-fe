import React, { useState } from 'react';
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrganizationSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    orgName: '',
    orgAddress: '',
    orgEmail: '',
    orgPhoneNo: '',
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/v1/auth/org-admin', formData);
      toast({
        title: 'Signup Successful',
        description: 'Organization admin signup successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error signing up. Please try again.';
      console.error('Signup error:', error);
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box width="400px" p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Organization Signup
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Organization Name</FormLabel>
          <Input type="text" name="orgName" value={formData.orgName} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Organization Address</FormLabel>
          <Input type="text" name="orgAddress" value={formData.orgAddress} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Organization Email</FormLabel>
          <Input type="email" name="orgEmail" value={formData.orgEmail} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Organization Phone Number</FormLabel>
          <Input type="tel" name="orgPhoneNo" value={formData.orgPhoneNo} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Flex>
  );
};

export default OrganizationSignup;
