import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar/navbar';
import VideoList from './components/videoList/videoList';

class App extends Component {
	state = {}
	render() {
		return (
			<div>
				<Navbar />
				<VideoList />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));