import React,{useState} from 'react'
import { Tabs,TabList,TabPanels,Tab,TabPanel } from '@chakra-ui/react';
import EmployeeTable from '../component/EmployeeTable';
import Organization from '../component/Organization';

export default function Employees() {
  return (
    <div>
<Tabs variant='soft-rounded' colorScheme='green' size="md">
  <TabList>
    <Tab>Employees</Tab>
    <Tab>Org Details</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
   <EmployeeTable></EmployeeTable>
    </TabPanel>
    <TabPanel>
<Organization></Organization>
    </TabPanel>
  </TabPanels>
</Tabs>
    </div>
  )
}
