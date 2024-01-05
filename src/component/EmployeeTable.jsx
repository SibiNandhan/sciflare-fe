import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Flex, Text, Button } from '@chakra-ui/react';
import axios from './../config/axios';

const EmployeeTable = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5); // Number of items per page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/user?skip=${(currentPage-1)*perPage
        }&limit=${perPage}`);

        setEmployeeData(response.data.data);
        const totalCount = response.data.count;
        const pages = Math.ceil(totalCount / perPage);
        setTotalPages(pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, perPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Flex direction="column" align="center" mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>Employee Data</Text>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
             <Th>Is Admin</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employeeData.map((employee, index) => (
            <Tr key={index}>
              <Td>{employee.name}</Td>
              <Td>{employee.email}</Td>
              <Td>{employee.isAdmin == true ? 'Yes' : 'No'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex mt={4} justify="center">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          mr={2}
        >
          Previous
        </Button>
        <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          ml={2}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default EmployeeTable;
