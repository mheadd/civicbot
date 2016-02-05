var utilities = require('utilities');
var config = require('config');

exports.respond = function(bot, message, response) {
	if(!response.entities.location) {
		bot.reply(message, 'You need to specify a station name like this: ```train times for {street address}```');
	}
	else {
		var station = convertStationName(response.entities.location[0].value);
		var url = config.apis.train_times_url.replace('%station%', station);
		settings.station = station;
		utilities.getJson(bot, message, url, settings, buildResonse);
	}
};

// Settings for use in rendering user response.
var settings = {};

// Build the response to the user.
function buildResonse(bot, message, settings, error, response, body) {
	if(!error && response.statusCode == 200) {
		var trains = parseJson(JSON.parse(body));
		var user_response = '';
		for (var train in trains) {
			 user_response += status_template
			 .replace('%path%', trains[train].path)
			 .replace('%destination%', trains[train].destination)
			 .replace('%depart_time%', utilities.formatTime(new Date(convertDateString(trains[train].depart_time))))
			 .replace('%status%', trains[train].status);
		}
		bot.reply(message, user_response);
		bot.reply(message, displays[settings.station]);
	}
	else {
		bot.reply(message, 'Sorry, I could not find train times for ' + utilities.toTitleCase(response.entities.location) + '.');
	}
}

// Template for rendering train details.
var status_template = 'Train %path% toward %destination% will depart at *%depart_time%*. Current status: *%status%*.\n';

// URLs for schedule displays in Center City stations.
var displays = {
	90004: 'http://www3.septa.org/ccstations/30th/',
	90005: 'http://www3.septa.org/ccstations/ss/',
	90006: 'http://www3.septa.org/ccstations/me/'
}

// Convert JSON response from SEPTA API.
function parseJson(obj) {
	var trains_array = obj[Object.keys(obj)[0]]
	var schedule_array = []
	for(var train in trains_array[0]["Northbound"]) {
		schedule_array.push(trains_array[0]["Northbound"][train]);
	}
	for(var train in trains_array[1]["Southbound"]) {
		schedule_array.push(trains_array[1]["Southbound"][train]);
	}
	return schedule_array;
}

// Convert station names to IDs.
function convertStationName(station) {
	switch(true) {
		case /^.*?\b30th\b.*?$/i.test(station): return 90004;
		case /^.*?\bSuburban\b.*?$/i.test(station): return 90005;
		case /^.*?\bMarket\b.*?$/i.test(station): return 90006;
	}
	return station;
} 

// Fixes an issue with date string returned from SEPTA API.
function convertDateString(str) {
	return str.replace('PM', ' PM').replace('AM', ' AM');
}