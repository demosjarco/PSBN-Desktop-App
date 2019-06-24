import React, { Component } from 'react';
import './videoList.css';

class VideoList extends Component {
	state = {
		upcoming: [],
		past: []
	}
	componentWillMount() {
		window.ipc.send('getEvents');
		window.ipc.on('gotEvents', (event, upcoming1, past1) => {
			sessionStorage.setItem('upcoming', JSON.stringify(upcoming1));
			sessionStorage.setItem('past', JSON.stringify(past1));

			this.setState({ upcoming: upcoming1, past: past1 });
		});
	}
	renderList() {
		//console.log(this.state.past);
		const pastVideoList = this.state.past.map((event) => {
			if (event.logo.secure_thumb_url) {
				const eventImageUrl = event.logo.secure_thumb_url.replace(/(?<=htt(p:|ps:)\/\/img.new.livestream.com\/events\/(\d+|\w+)+\/(\d+|\w+)+-(\d+|\w+)+-(\d+|\w+)+-(\d+|\w+)+-(\d+|\w+)+_)\d+x\d+/, '400x225');
				let duration = new Date(Math.abs(new Date(event.start_time).getTime() - new Date(event.end_time).getTime()));
				return (
					<div key={event.owner.id + '|' + event.id}>
						<picture>
							<source srcSet={eventImageUrl} type="image/jpg" />
							<img src={eventImageUrl} />
						</picture>
						<div className="content">
							<span className="title">{event.full_name}</span>
							<span className="duration">{(duration.getUTCHours() > 0 ? duration.getUTCHours() + ':' : '') + (duration.getUTCMinutes().toString().length < 2 ? (duration.getUTCMinutes().toString() + '0') : duration.getUTCMinutes()) + ':' + (duration.getUTCSeconds().toString().length < 2 ? (duration.getUTCSeconds().toString() + '0') : duration.getUTCSeconds())}</span>
							<span className="date">{new Date(event.start_time).toLocaleString()}</span>
						</div>
					</div>
				);
			}
		});

		return (
			<div className="videoGrid past">{pastVideoList}</div>
		);
	}
	render() {
		return (
			<div className="gridList">
				{ this.renderList() }
			</div>
		);
	}
}

export default VideoList;