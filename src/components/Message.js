import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
// import Form from "./Form";

class Message extends Component {

	render() {
		let message = this.props.msg === true ? 'Form is Complete!' : 'Form is Incomplete!';
		return (
  <div>
	  <h3 className='text-center message'>{message}</h3>
  </div>
);

	}
}

// Uncomment this snippet
Message.propTypes = {
	msg: PropTypes.bool
};


export default Message;