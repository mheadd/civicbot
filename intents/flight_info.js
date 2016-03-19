var utilities = require('../utilities/utilities');
var config = require('../config/config');

exports.respond = function(bot, message, response) {
	if(!response.entities.number) {
		bot.reply(message, "You need to specify a flight number. Like this: ```get flight status for {flight number}```");
	}
	else {
		var flight_number = response.entities.number[0].value;
		var url = config.apis.flightinfo_url + flight_number;
		utilities.getJson(bot, message, url, settings, buildResonse);
	}
};

// Settings for use in rendering user response.
var settings = {};

// Build the response to the user.
function buildResonse(bot, message, settings, error, response, body) {
	if(!error && response.statusCode == 200) {
		var flights = JSON.parse(body);
		var user_response = '';
		if(flights.length == 0) {
			user_response += 'I could not find a record for that flight number.';
		}
		else {
			for (var flight in flights) {
				var estimatedDateTime = new Date(flights[flight].estimatedDateTime);
				user_response += '*Flight number*: ' + flights[flight].flightNumber + '\n';
				user_response += '*Direction*: ' + flights[flight].direction + '\n';
				user_response += '*Airport*: ' + flights[flight].airport + '\n';
				user_response += '*Estimated time*: ' + utilities.formatDate(estimatedDateTime) + ' ' + utilities.formatTime(estimatedDateTime) + '\n';
				user_response += '*Status*: ' + flights[flight].status + '\n';
				user_response += '*Terminal*: ' + flights[flight].terminal + '\n';
				user_response += '*Gate*: ' + flights[flight].gate + '\n';
				user_response += '*Garage*: ' + flights[flight].garage + '\n';
				user_response += '*SEPTA Station*: ' + flights[flight].septa + '\n';
				user_response += '\n';
			}
		}
		bot.reply(message, user_response);
	}
	else {
		bot.reply(message, 'Sorry, I could not look up the status of flight number ' + flight_number + '.');
	}
}