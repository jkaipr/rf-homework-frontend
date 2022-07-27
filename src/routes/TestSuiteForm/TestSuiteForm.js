import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestSuiteForm = ({ testSuite }) => {
  const navigate = useNavigate();
  return (
    <Flex flexDirection="column" m={6}>
      <Button onClick={() => navigate('/test_suites')}>Back</Button>
      {JSON.stringify(testSuite)}
    </Flex>
  );
};

export default TestSuiteForm;
