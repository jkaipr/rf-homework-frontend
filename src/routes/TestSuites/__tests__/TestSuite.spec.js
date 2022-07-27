import { Accordion, AccordionButton, Button } from '@chakra-ui/react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import TestPlan from '../TestPlan';
import TestSuite from '../TestSuite';

describe('TestSuite', () => {
  let comp, props;
  beforeEach(() => {
    props = {
      onEditTestSuite: jest.fn(),
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

    comp = mount(
      <Accordion>
        <TestSuite {...props} />
      </Accordion>,
      {
        wrappingComponent: MemoryRouter,
      }
    );
  });

  it('renders', () => {
    expect(comp.find(AccordionButton).text()).toContain(
      props.testSuite.test_suite_name
    );
    expect(comp.find(AccordionButton).text()).toContain(
      `${props.testSuite.test_plans.length} tests`
    );
    [0, 1, 2].map((idx) => {
      expect(comp.find(TestPlan).at(idx).prop('testPlan')).toEqual(
        props.testSuite.test_plans[idx]
      );
    });
  });

  it('calls onEditTestSuite when Edit button is clicked', () => {
    comp.find(Button).invoke('onClick')();
    expect(props.onEditTestSuite).toBeCalledWith(props.testSuite);
  });
});
