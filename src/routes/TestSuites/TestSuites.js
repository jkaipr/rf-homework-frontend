import { Accordion, Center, CircularProgress } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { fetchTestSuites } from '../../api';
import TestSuite from './TestSuite';

const TestSuites = ({ onEditTestSuite }) => {
  const [testSuites, setTestSuites] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      let fetchedSuites = [];
      setIsFetching(true);
      try {
        fetchedSuites = await fetchTestSuites();
      } finally {
        setIsFetching(false);
      }
      setTestSuites(fetchedSuites);
    };
    fetch();
  }, []);

  if (isFetching) {
    return (
      <Center flexDirection="column" h="100%">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <Accordion>
      {testSuites.map((testSuite) => (
        <TestSuite
          key={testSuite.id}
          onEditTestSuite={onEditTestSuite}
          testSuite={testSuite}
        />
      ))}
    </Accordion>
  );
};

export default TestSuites;
