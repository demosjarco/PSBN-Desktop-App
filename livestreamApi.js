'use strict';

// owner_account_id
const accountIds = {
	chs: 21054388,
	cehs: 14884070,
	ihs: 27655587,
	lhs: 9697821,
	phs: 25780015,
	rsk: 5145446,
	smhs: 27655594
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

const { ipcMain } = require('electron');