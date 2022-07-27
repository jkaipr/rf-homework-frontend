import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TestSuiteForm = ({ testSuite }) => {
  const navigate = useNavigate();
  const [suiteName, setSuiteName] = useState(testSuite.test_suite_name);
  const [testPlans, setTestPlans] = useState(testSuite.test_plans);
  return (
    <Flex flexDirection="column" m={6}>
      <Box>
        <Button onClick={() => navigate('/test_suites')}>Back</Button>
      </Box>
      <VStack
        align="flex-start"
        as="form"
        onSubmit={(ev) => {
          ev.preventDefault();
          console.log({
            id: testSuite.id,
            test_suite_name: suiteName,
            test_plans: testPlans,
          });
        }}
      >
        <FormControl>
          <FormLabel>Test suite name</FormLabel>
          <Input
            isRequired
            onChange={({ target: { value } }) => setSuiteName(value)}
            type="text"
            value={suiteName}
          />
        </FormControl>
        {testPlans.map((testPlan, idx) => {
          return (
            <>
              <FormControl key={idx}>
                <FormLabel fontSize="lg" mt={4}>
                  Test plan name
                </FormLabel>
                <Input
                  isRequired
                  onChange={({ target: { value } }) => {
                    setTestPlans((prevTests) => {
                      const tests = [...prevTests];
                      tests[idx].test_name = value;
                      return tests;
                    });
                  }}
                  type="text"
                  value={testPlans[idx].test_name}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Browser</FormLabel>
                <RadioGroup
                  onChange={(newBrowser) => {
                    setTestPlans((prevTests) => {
                      const tests = [...prevTests];
                      tests[idx].browser = newBrowser;
                      return tests;
                    });
                  }}
                  value={testPlans[idx].browser}
                >
                  <HStack>
                    <Radio value="chrome">Chrome</Radio>
                    <Radio value="firefox">Firefox</Radio>
                    <Radio value="safari">Safari</Radio>
                    <Radio value="edge">Edge</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Instruction count</FormLabel>
                <Input
                  min={1}
                  onChange={({ target: { value } }) => {
                    setTestPlans((prevTests) => {
                      const tests = [...prevTests];
                      tests[idx].instruction_count = value;
                      return tests;
                    });
                  }}
                  type="number"
                  value={testPlans[idx].instruction_count}
                />
              </FormControl>
              <Button
                isDisabled={testPlans.length === 1}
                onClick={() => {
                  setTestPlans((prevTests) => {
                    const tests = [...prevTests];
                    tests.splice(idx, 1);
                    return tests;
                  });
                }}
              >
                Remove test
              </Button>
            </>
          );
        })}
        <Button
          onClick={() => {
            setTestPlans((prevTests) => {
              const tests = [...prevTests];
              tests.push({
                test_name: '',
                browser: 'chrome',
                instruction_count: 1,
              });
              return tests;
            });
          }}
        >
          Add new test
        </Button>
        <Button type="submit">Submit</Button>
      </VStack>
    </Flex>
  );
};

export default TestSuiteForm;
