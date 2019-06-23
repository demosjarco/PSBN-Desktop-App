"use strict";

import React, { Component } from 'react';

class Navbar extends Component {
	state = {}
	render() {
		return (
			<div style={{
				position: 'fixed',
				top: '8px',
				right: '8px'
			}}>
				<i style={{
					color: 'white'
				}} className="material-icons">minimize</i>
				<i style={{
					color: 'white'
				}} className="material-icons">crop_square</i>
				<i style={{
					color: 'white'
				}} className="material-icons">close</i>
			</div>
		);
	}
}

export default Navbar;