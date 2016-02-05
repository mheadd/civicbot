var utilities = require('utilities');
var config = require('config');

exports.respond = function(bot, message, response) {
	utilities.getJson(bot, message, config.apis.parking_api_url, settings, buildResonse);
};

// Settings for use in rendering user response.
var settings = {};

// Build the response to the user.
function buildResonse(bot, message, settings, error, response, body) {
	if(!error && response.statusCode == 200) {
		var parking = JSON.parse(body).garages;
		var user_response = '';
		for(var garage in parking) {
			user_response += '*Garage ' + parking[garage].display_name + '*: ';
			user_response += Math.round(parking[garage].spaces_available) + ' spaces available / ';
			user_response += Math.round(parking[garage].ada_spaces) + ' handicapped accessible spaces available.';
			user_response += '\n';
		}
		bot.reply(message, user_response);
		bot.reply(message, config.apis.parking_web_url);
	}
	else {
		bot.reply(message, 'Sorry, I could not look up information on airport parking.');
	}
}