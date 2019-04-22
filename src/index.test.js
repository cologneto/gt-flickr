import React from 'react';
import { shallow, mount} from 'enzyme';
import Home from './components/Home/home'

it('renders without crashing', () => {
    shallow(<Home />);
});