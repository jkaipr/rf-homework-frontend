export const fetchTestSuites = async () => {
  const response = await fetch('http://localhost:3456/test_suites');
  return await response.json();
};
