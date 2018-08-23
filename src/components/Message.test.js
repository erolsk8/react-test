import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import App from '../App';
import Form from './Form';
import Message from './Message';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { spy } from 'sinon';

configure({ adapter: new Adapter() });

describe('FormComponent', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    let det = spy()
    ReactDOM.render(<Message />, div);
  });

  it('check if valid message is rendered', () => {
    const msg = mount(<Message msg={true} />);
    expect(msg.find('.message').text()).toEqual("Form is Complete!");
  });

  it('check if invalid message is rendered', () => {
    const msg = mount(<Message msg={false} />);
    expect(msg.find('.message').text()).toEqual("Form is Incomplete!");
  });
});
