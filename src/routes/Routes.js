import { useState } from 'react';
import {
  Route,
  Routes as ReactRouterRoutes,
  useNavigate,
} from 'react-router-dom';

import TestSuiteForm from './TestSuiteForm';
import TestSuites from './TestSuites';

const Routes = () => {
  const [editedTestSuite, setEditedTestSuite] = useState();
  const navigate = useNavigate();
  const onEditTestSuite = (testSuite) => {
    setEditedTestSuite(testSuite);
    navigate(`/test_suites/${testSuite.id}`);
  };
  return (
    <ReactRouterRoutes>
      <Route index element={<TestSuites />} />
      <Route
        path="/test_suites"
        element={<TestSuites onEditTestSuite={onEditTestSuite} />}
      />
      <Route
        path="/test_suites/:id"
        element={<TestSuiteForm testSuite={editedTestSuite} />}
      />
    </ReactRouterRoutes>
  );
};

export default Routes;
