import React from 'react';
import { shallow, mount} from 'enzyme';
import { expect } from 'chai';
import Card from './card'

it('Card renders', () => {
    const wrapper = mount(<Card/>);

    wrapper.setState({
        tags: ["span", "pesho"]
    })
    expect(wrapper.state().tags).to.have.lengthOf(2);
});