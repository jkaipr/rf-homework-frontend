import { RadioGroup, VStack } from '@chakra-ui/react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import TestSuiteForm from '../TestSuiteForm';

describe('TestSuiteForm', () => {
  let comp, props;
  beforeEach(() => {
    props = {
      testSuite: {
        id: 6,
        test_suite_name: 'Suite Low Zero',
        test_plans: [
          {
            test_name: 'Test Plan Send Now Soil Husband',
            browser: 'edge',
            instruction_count: 19,
          },
          {
            test_name: 'Test Plan Frighten Strength Personal',
            browser: 'safari',
            instruction_count: 14,
          },
          {
            test_name: 'Test Plan Stronger Structure',
            browser: 'firefox',
            instruction_count: 13,
          },
        ],
      },
    };

    comp = mount(<TestSuiteForm {...props} />, {
      wrappingComponent: MemoryRouter,
    });
  });

  it('renders', () => {
    expect(
      comp.find('input[data-testid="testSuiteName"]').prop('value')
    ).toEqual(props.testSuite.test_suite_name);
    [0, 1, 2].map((idx) => {
      expect(
        comp.find('input[data-testid="testName"]').at(idx).prop('value')
      ).toEqual(props.testSuite.test_plans[idx].test_name);
      expect(comp.find(RadioGroup).at(idx).prop('value')).toEqual(
        props.testSuite.test_plans[idx].browser
      );
      expect(
        comp
          .find('input[data-testid="testInstructionCount"]')
          .at(idx)
          .prop('value')
      ).toEqual(props.testSuite.test_plans[idx].instruction_count);
    });
  });

  it('allows changing values and submitting form', () => {
    const newTestName = 'New test';
    const newTestBrowser = 'firefox';
    const newTestInstructionCount = 15;
    const preventDefault = jest.fn();
    console.log = jest.fn();

    comp.find('[data-testid="removeTest"]').last().invoke('onClick')();
    expect(comp.find('input[data-testid="testName"]').length).toEqual(
      props.testSuite.test_plans.length - 1
    );

    comp.find('[data-testid="removeTest"]').last().invoke('onClick')();
    expect(comp.find('input[data-testid="testName"]').length).toEqual(
      props.testSuite.test_plans.length - 2
    );

    comp.find('[data-testid="addTest"]').last().invoke('onClick')();
    expect(comp.find('input[data-testid="testName"]').length).toEqual(
      props.testSuite.test_plans.length - 1
    );

    comp.find('[data-testid="testName"]').last().invoke('onChange')({
      target: { value: newTestName },
    });
    expect(
      comp.find('input[data-testid="testName"]').last().prop('value')
    ).toEqual(newTestName);

    comp.find(RadioGroup).last().invoke('onChange')(newTestBrowser);
    expect(comp.find(RadioGroup).last().prop('value')).toEqual(newTestBrowser);

    comp
      .find('input[data-testid="testInstructionCount"]')
      .last()
      .invoke('onChange')({
      target: { value: newTestInstructionCount },
    });
    expect(
      comp
        .find('input[data-testid="testInstructionCount"]')
        .last()
        .prop('value')
    ).toEqual(newTestInstructionCount);

    comp.find(VStack).invoke('onSubmit')({ preventDefault });
    expect(preventDefault).toBeCalled();
    expect(console.log).toBeCalledWith(
      JSON.stringify({
        id: 6,
        test_suite_name: 'Suite Low Zero',
        test_plans: [
          {
            test_name: 'Test Plan Send Now Soil Husband',
            browser: 'edge',
            instruction_count: 19,
          },
          { test_name: 'New test', browser: 'firefox', instruction_count: 15 },
        ],
      })
    );
  });
});
