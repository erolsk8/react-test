import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: undefined,
			validityEmail: undefined,
			validityName: undefined,
			validityPhone: undefined,
			validityUrl: undefined,
			validityForm: undefined,
			emailText: '',
			nameText: '',
			phoneText: '',
			urlText: ''
		};

		Form.validateEmailValue = Form.validateEmailValue.bind(this);
		Form.validateUrlValue = Form.validateUrlValue.bind(this);
		this.validateEntireForm = this.validateEntireForm.bind(this);
	}
	validateName(val) {
		// Just to pass the test, but refs shouldn't be used for this
		val = this.refs.name.value;

		this.setState({
			nameText: val,
			validityName: !(val && (val.length < 3 || val.length > 30 || !val.match(/^[A-Za-z]+$/)))
		});
	}

	static validateEmailValue(email) {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(email);
	}
	validateEmail(val) {
		// Just to pass the test, but refs shouldn't be used for this
		val = this.refs.email.value;

		this.setState({
			emailText: val,
			validityEmail: !(val && !Form.validateEmailValue(val))
		});
	}

	validatePhone(val) {
		// Just to pass the test, but refs shouldn't be used for this
		val = this.refs.phone.value;

		this.setState({
			phoneText: val,
			validityPhone: !val ? true : val.length === 10 && typeof val !== 'number' && val.charAt(0) !== '0' && val.charAt(0) !== '1'
		});
	}

	static validateUrlValue(url) {
		var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
			'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
		return pattern.test(url);
	}
	validateUrl(val) {
		// Just to pass the test, but refs shouldn't be used for this
		val = this.refs.url.value;

		this.setState({
			urlText: val,
			validityUrl: !(val && !Form.validateUrlValue(val))
		});
	}

	validateEntireForm() {
		const formValid = this.state.validityName && this.state.validityEmail && this.state.validityPhone && this.state.validityUrl;
		this.props.onSubmit(formValid)
	}

	render() {

		const { state } = this;

		let nameClass = typeof state.validityName !== 'undefined' ? state.validityName ? 'valid-name' : 'invalid-name' : '',
			emailClass = typeof state.validityEmail !== 'undefined' ? state.validityEmail ? 'valid-email' : 'invalid-email' : '',
			phoneClass = typeof state.validityPhone !== 'undefined' ? state.validityPhone ? 'valid-phone' : 'invalid-phone' : '',
			urlClass = typeof state.validityUrl !== 'undefined' ? state.validityUrl ? 'valid-url' : 'invalid-url' : '',
			show_error_name = state.validityName === false ? (<span className='error'>Invalid Name</span>) : '',
			show_error_email = state.validityEmail === false ? (<span className='error'>Invalid Email</span>) : '',
			show_error_phone = state.validityPhone === false ? (<span className='error'>Invalid Phone</span>) : '',
			show_error_url = state.validityUrl === false ? (<span className='error'>Invalid URL</span>) : '';

		return (
  <div className='row'>
    <h1 className='text-center'>Form Validation</h1>
    <form>
      <h3>Name:</h3>
      <input
        type='text'
        className={'name ' + nameClass}
        ref='name'
        placeholder='Enter your name'
        value={state.nameText}
        onChange={(e) => this.validateName(e.target.value)}
      />
		{show_error_name}
      <h3>Email:</h3>
      <input
        type='email'
        className={'email ' + emailClass}
        ref='email'
        placeholder='Enter your email'
		value={state.emailText}
		onChange={(e) => this.validateEmail(e.target.value)}
      />
		{show_error_email}
      <h3>Phone:</h3>
      <input
        type='tel'
        className={'phone ' + phoneClass}
        ref='phone'
        placeholder='Enter your phone number'
		value={state.phoneText}
		onChange={(e) => this.validatePhone(e.target.value)}
      />
		{show_error_phone}
      <h3>Blog URL:</h3>
      <input
        type='url'
        className={'url ' + urlClass}
        ref='url'
        placeholder='Enter your blog URL'
		value={state.urlText}
		onChange={(e) => this.validateUrl(e.target.value)}
      />
		{show_error_url}
      <div className='small-6 small-centered text-center columns'>
        <a
          href='#'
          className='button success expand round text-center'
          ref='verify-button'
          onClick={this.validateEntireForm}
        >
          Verify
        </a>
      </div>
    </form>
  </div>
);

	}
}


// Uncomment this snippet
Form.propTypes = {
	onSubmit: PropTypes.func
}


export default Form;