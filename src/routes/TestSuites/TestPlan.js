import { GridItem } from '@chakra-ui/react';
import React from 'react';

const TestPlan = ({ testPlan }) => {
  return (
    <>
      <GridItem p={4}>{testPlan.test_name}</GridItem>
      <GridItem p={4}>{testPlan.browser}</GridItem>
      <GridItem p={4}>{testPlan.instruction_count}</GridItem>
    </>
  );
};

export default TestPlan;
