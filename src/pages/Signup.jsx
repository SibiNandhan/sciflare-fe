import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    orgId: '',
    name: '',
  });

  const [orgList, setOrgList] = useState([]);
  const [error, setError] = useState(null);

  const toast = useToast();
  const history = useNavigate();

  useEffect(() => {
    // Fetch org list on component mount
    const fetchOrgList = async () => {
      try {
        const response = await axios.get('/api/v1/org');
        setOrgList(response.data);
      } catch (error) {
        console.error('Error fetching org list:', error);
      }
    };

    fetchOrgList();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/v1/auth/signup', formData);
      toast({
        title: 'Signup Successful',
        description: 'You have successfully signed up!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Redirect to home page after successful signup
      history('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message,
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
          Signup
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
          <FormLabel>Organization</FormLabel>
          <Select name="orgId" value={formData.orgId} onChange={handleChange}>
            {orgList.map((org) => (
              <option key={org._id} value={org._id}>
                {org.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
        {error && (
          <Box mt={4} color="red.500">
            {error}
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Signup;
