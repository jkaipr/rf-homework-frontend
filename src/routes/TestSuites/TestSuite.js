import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Grid,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import TestPlan from './TestPlan';

const TestSuite = ({ onEditTestSuite, testSuite }) => {
  return (
    <AccordionItem mt={0} width="100%">
      <AccordionButton p={2}>
        <AccordionIcon />
        {testSuite.test_suite_name}

        <Text ml="auto">
          {testSuite.test_plans.length}{' '}
          {testSuite.test_plans.length > 1 ? 'tests' : 'test'}
        </Text>
        <Button ml="200px" onClick={() => onEditTestSuite(testSuite)}>
          Edit
        </Button>
      </AccordionButton>
      <AccordionPanel>
        <Grid templateColumns="1fr 1fr 1fr">
          {testSuite.test_plans.map((testPlan, idx) => (
            <TestPlan key={idx} testPlan={testPlan} />
          ))}
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TestSuite;
