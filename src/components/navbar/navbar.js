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
			<nav>
				<ul>
					<li><span>Schools</span>
						<ul>
							<li>Cactus</li>
							<li>Centennial</li>
							<li>Ironwood</li>
							<li>Liberty</li>
							<li>Peoria</li>
							<li>Kellis</li>
							<li>Sunrise Mtn.</li>
							<li>District</li>
						</ul>
					</li>
				</ul>
				<span>PSBN</span>
				<div className="windowControls">
					<i onClick={this.minimize} className="material-icons">minimize</i>
					<i onClick={this.maximize} className="material-icons">crop_square</i>
					<i onClick={this.close} className="material-icons close">close</i>
				</div>
			</nav>
		);
	}
}

export default Navbar;