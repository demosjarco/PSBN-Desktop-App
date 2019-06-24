'use strict';

// owner_account_id
const accountIds = {
	chs: 21054388,
	cehs: 14884070,
	ihs: 27655587,
	lhs: 9697821,
	phs: 25780015,
	rsk: 5145446,
	smhs: 27655594,
	district: 9697821
}

// https://api.new.livestream.com/accounts/21054388
// https://api.new.livestream.com/accounts/21054388/events/8580803
function apiRequest(callback, accountId, eventId) {
	if (accountId == undefined || accountId == null)
		throw new Error('Must contain accountId');

	let url = 'https://api.new.livestream.com/accounts/' + accountId;
	if (eventId) {
		url += '/events/' + eventId;
	}
	require('request')(url, function (error, response, body) {
		if (error) {
			throw error;
		} else if (response.statusCode != 200) {
			throw new Error('HTTP ' + response.statusCode);
		} else {
			callback(JSON.parse(body));
		}
	});
}

module.exports.loadAll = function() {
	const main = require('./main.js');

	let done = 0.0;
	let total = 0;
	let upcoming = [];
	let past = [];
	main.mainWindow.setProgressBar(Infinity);
	Object.values(accountIds).forEach(function (schoolId) {
		apiRequest(function (json) {
			total += json.upcoming_events.data.length;
			total += json.past_events.data.length;
			main.mainWindow.setProgressBar(done / total);

			json.upcoming_events.data.forEach(function (event) {
				let newEvent = true;
				upcoming.map((oldEvent) => {
					if (oldEvent.id == event.id)
						newEvent = false;
				});
				if (newEvent)
					upcoming.push(event);
				done += 1;
				main.mainWindow.setProgressBar(done / total);
			});
			json.past_events.data.forEach(function (event) {
				let newEvent = true;
				past.map((oldEvent) => {
					if (oldEvent.id == event.id)
						newEvent = false;
				});
				if (newEvent)
					past.push(event);
				done += 1;
				main.mainWindow.setProgressBar(done / total);
			});

			if (done == total) {
				main.mainWindow.setProgressBar(-Infinity);
				upcoming.sort(function (a, b) {
					return new Date(b.start_time) - new Date(a.start_time);
				});
				past.sort(function (a, b) {
					return new Date(b.start_time) - new Date(a.start_time);
				});
				main.mainWindow.webContents.send('gotEvents', upcoming, past);
			}
		}, schoolId);
	});
}