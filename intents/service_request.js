var utilities = require('utilities');
var config = require('config');

exports.respond = function(bot, message, response) {
	if(!response.entities.number) {
		bot.reply(message, 'You need to specify a service request ID. Like this: ```service request status for {service request id}```');
	}
	else {
		var service_request_id = response.entities.number[0].value;
		var url = config.apis.service_request_url.replace('%id%', service_request_id);
		utilities.getJson(bot, message, url, settings, buildResonse);
	}
};

// Settings for use in rendering user response.
var settings = {};

// Build the response to the user.
function buildResonse(bot, message, settings, error, response, body) {
	var user_response = '';
	if(!error && response.statusCode == 200) {
		var service_request = JSON.parse(body)[0];
		user_response += '*Service Request ID*: ' + service_request.service_request_id + '\n';
		user_response += '*Service Name*: ' + service_request.service_name + '\n';
		user_response += '*Current Status*: ' + utilities.toTitleCase(service_request.status) + '\n';
		if(service_request.status_notes) {
			user_response += '*Status Information:*: ' + service_request.status_notes + '\n';
		}
		user_response += '*Description*: ' + cleanDescription(service_request.description) + '\n';
		user_response += '*Responsible Agency*: ' + service_request.agency_responsible + '\n';
		user_response += '*Service Notice*: ' + service_request.service_notice + '\n';
		user_response += '*Requested Date*: ' + utilities.formatDate(new Date(service_request.requested_datetime)) + '\n';
		user_response += '*Last Updated*: ' + utilities.formatDate(new Date(service_request.updated_datetime)) + '\n';
		user_response += '*Expected Resolution*: ' + utilities.formatDate(new Date(service_request.expected_datetime)) + '\n';
		if(service_request.media_url) {
			user_response += service_request.media_url + '\n\n';
		}

	}
	else {
		user_response += 'Sorry, I could not find a service request with ID ' + service_request.service_request_id;
	}
	bot.reply(message, user_response);
}

// Clean up text in descrition field.
function cleanDescription(text) {
	if(text) {
		return utilities.toTitleCase(text.substring(0, text.indexOf('\n\n ')));
	}
	return 'No description.';
}