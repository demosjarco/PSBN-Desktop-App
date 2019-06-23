import React, { Component } from 'react';
import './navbar.css';

class Navbar extends Component {
	state = {}
	minimize() {
		window.ipc.send('minimize');
	}
	maximize() {
		window.ipc.send('maximize');
	}
	close() {
		window.ipc.send('close');
	}
	render() {
		return (
			<div className="windowControls">
				<i onClick={this.minimize} className="material-icons">minimize</i>
				<i onClick={this.maximize} className="material-icons">crop_square</i>
				<i onClick={this.close} className="material-icons">close</i>
			</div>
		);
	}
}

export default Navbar;