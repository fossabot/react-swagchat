declare var jest, describe, it, expect, require;

import * as React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import { Avatar } from '../../src/components';

const testComponent1 = shallow(
  <Avatar
    src="http://swagchat.io/logo.png"
  />
);
it('Avatar renders correctly', () => {
  const j = toJson(testComponent1);
  expect(j).toMatchSnapshot();
});

const testComponent2 = shallow(
  <Avatar
    src="http://swagchat.io/logo.png"
    shape="square"
    className="test-class"
    style={{width: '100px'}}
    onClick={() => console.log('click')}
  />
);
it('Avatar renders correctly', () => {
  const j = toJson(testComponent2);
  expect(j).toMatchSnapshot();
});
