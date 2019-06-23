import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar';

class App extends Component {
	state = {}
	render() {
		return (
			<div>
				<Navbar />
				<h1>test</h1>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));