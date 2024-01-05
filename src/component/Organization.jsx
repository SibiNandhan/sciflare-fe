import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import axios from './../config/axios';

const Organization = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/org/user');
        setUserData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('You are Unauthorized');
        } else {
          setError('Error fetching data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex direction="column" align="center" mt={8}>
      {loading && <Spinner size="xl" />}
      {userData && (
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            User Profile
          </Text>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Organization Address: {userData.organization_address}</Text>
          <Text>Phone Number: {userData.phone_no}</Text>
        </Box>
      )}
      {error && <Text color="red.500">{error}</Text>}
    </Flex>
  );
};

export default Organization;
