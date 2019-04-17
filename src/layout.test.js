/*
import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';

import { startSearch } from './layout';

configure({ adapter: new Adapter() });


describe('Local State', () => {
  it('Should set sTag to inputValue...', () => {
    const state = { inputValue: 1 };
    //startSearch();
    const newState = {inputValue: 1, sTag: 1};

    expect(newState.inputValue).to.equal(1);
  });
});*/


import React from 'react';
import sinon from 'sinon';
import Enzyme from 'enzyme'
import { expect } from 'chai';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Layout from './layout';

Enzyme.configure({ adapter: new Adapter() });

describe('<Layout />', () => {
  it('simulates click event', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(<Layout />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property()
  });
});