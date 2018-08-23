import React, {Component} from 'react';
import Form from './components/Form'
import Message from './components/Message'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayMessage: false
		};

		this.onSubmit = this.onSubmit.bind(this);
	}
	onSubmit(messageState) {
		this.setState({
			displayMessage: messageState
		})
	}
	render() {
		return (
  <div>
    <Form onSubmit={this.onSubmit} />
    <Message msg={this.state.displayMessage} />
  </div>
);

	}
}

export default App;