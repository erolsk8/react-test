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
    ReactDOM.render(<Form onSubmit={det}/>, div);
  });

  it('check button UI', () => {
    const wrapper = mount(<Form />);
    wrapper.find('.small-6').instance().click()
    const app = mount(<App />);
    let txt = app.find('.message').text()
    expect(txt).toEqual("Form is Incomplete!");
  });

  it('check for all form fields', () => {
    const wrapper = mount(<Form />);
    let len = wrapper.find('input').length;
    expect(len).toEqual(4);
  });

  it('check name validation', () => {
    const wrapper = mount(<Form />);
    wrapper.find('.name').instance().value = "Hacker";
    wrapper.instance().validateName();
    expect(wrapper.state().validityName).toBe(true);
    expect(wrapper.state().nameText).toEqual("Hacker");
  });

  it('check email validation', () => {
    const wrapper = mount(<Form />);
    wrapper.find('.email').instance().value = "sdjksadj@gmail.com";
    wrapper.instance().validateEmail();
    expect(wrapper.state().validityEmail).toBe(true);
    expect(wrapper.state().emailText).toEqual("sdjksadj@gmail.com");
  });

  it('check phone validation', () => {
    const wrapper = mount(<Form />);
    wrapper.find('.phone').instance().value = "102342342342342342";
    wrapper.instance().validatePhone();
    expect(wrapper.state().validityPhone).toBe(false);
    expect(wrapper.state().phoneText).toEqual("102342342342342342");
  });

  it('check url validation', () => {
    const wrapper = mount(<Form />);
    wrapper.find('.url').instance().value = "http://wikipedia.org";
    wrapper.instance().validateUrl();
    expect(wrapper.state().validityUrl).toBe(true);
    expect(wrapper.state().urlText).toEqual("http://wikipedia.org");
  });

  it('check entire form for validation when valid', () => {
    let det = spy();
    const form = mount(<Form onSubmit={det} />);
    form.find('.name').instance().value = "sasrank";
    form.instance().validateName();
    form.find('.email').instance().value = "aasdbc@xyz.com";
    form.instance().validateEmail();
    form.find('.phone').instance().value = "9856756756";
    form.instance().validatePhone();
    form.find('.url').instance().value = "http://google.com";
    form.instance().validateUrl();
    form.instance().validateEntireForm();
    expect(det.calledWith(true)).toEqual(true);
  });

  it('check entire form for validation when invalid', () => {
    let det = spy();
    const form = mount(<Form onSubmit={det} />);
    form.find('.name').instance().value = "ui";
    form.instance().validateName();
    form.find('.email').instance().value = "abc@xyz.com";
    form.instance().validateEmail();
    form.find('.phone').instance().value = "56756756";
    form.instance().validatePhone();
    form.find('.url').instance().value = "http://google.com";
    form.instance().validateUrl();
    form.instance().validateEntireForm();
    expect(det.calledWith(false)).toEqual(true);
  });

});
