import { CircularProgress } from '@chakra-ui/react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import React from 'react';

import { fetchTestSuites } from '../../../api';
import TestSuite from '../TestSuite';
import TestSuites from '../TestSuites';

jest.mock('../../../api');

describe('TestSuites', () => {
  let comp, props, resolve;
  const fetchSuitesResponse = [
    {
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
    {
      id: 8,
      test_suite_name: 'Suite Also Cook Bent',
      test_plans: [
        {
          test_name: 'Test Plan Lower Bear Tropical Interior',
          browser: 'chrome',
          instruction_count: 1,
        },
        {
          test_name: 'Test Plan Bound Earn',
          browser: 'safari',
          instruction_count: 14,
        },
        {
          test_name: 'Test Plan Sink Medicine Grain',
          browser: 'safari',
          instruction_count: 12,
        },
      ],
    },
  ];
  beforeEach(() => {
    fetchTestSuites.mockClear().mockReturnValue(
      new Promise((_resolve) => {
        resolve = () => {
          _resolve(fetchSuitesResponse);
        };
      })
    );
    props = {
      onEditTestSuite: jest.fn(),
    };

    act(() => {
      comp = mount(<TestSuites {...props} />);
    });
  });

  it('fetches data and renders', async () => {
    expect(fetchTestSuites).toBeCalled();

    comp.update();
    expect(comp.find(CircularProgress).exists()).toBeTruthy();

    await act(async () => {
      resolve();
    });
    comp.update();

    expect(comp.find(CircularProgress).exists()).toBeFalsy();
    [0, 1].map((idx) => {
      expect(comp.find(TestSuite).at(idx).prop('testSuite')).toEqual(
        fetchSuitesResponse[idx]
      );
    });
  });
});
