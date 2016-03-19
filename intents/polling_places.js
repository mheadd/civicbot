var utilities = require('../utilities/utilities');
var config = require('../config/config');

exports.respond = function(bot, message, response) {
	if(!response.entities.location) {
		bot.reply(message, 'You need to specify an address, like this: ```123 some street```');
	}
	else {
		var payload = { address: response.entities.location[0].value };
		var url = config.apis.polling_location_url;
		utilities.postJson(bot, message, url, settings, payload, buildResonse);
	}
}

// Settings for use in rendering user response.
var settings = {};

// Build the response to the user.
function buildResonse(bot, message, settings, error, response, body) {
	if(!error && response.statusCode == 200) {
		var place = body.features[0].attributes;
		bot.reply(message, 'Location: ' + place.location);
		bot.reply(message, 'Address: ' + place.display_address);
		bot.reply(message, 'Parking: ' + utilities.parkingCodeLookup(place.parking));
		bot.reply(message, 'Accessibility: ' + utilities.buildingCodeLookup(place.building));
		bot.reply(message, 'Map: https://www.google.com/maps/place/' + encodeURIComponent(place.display_address + ', Philadelphia, PA'));

	}
	else {
		bot.reply(message, 'Sorry, I could not look up polling location for that address.');
	}
}

// Look up the description for a building accessibility code.
exports.buildingCodeLookup = function(code) {
  return building[code];
}

// Look up the description for a parking code.
exports.parkingCodeLookup = function(code) {
  return parking[code];
}

var building = [];
building['F'] = 'Building Fully Accessible';
building['B'] = 'Building Substantially Accessible';
building['M'] = 'Building Accessibilty Modified';
building['A'] = 'Alternate Entrance';
building['R'] = 'Building Accessible With Ramp';
building['N'] = 'Building Not Accessible';

var parking = [];
parking['N'] = 'No Parking';
parking['G'] = 'General Parking';
parking['L'] = 'Loading Zone';
parking['H'] = 'Handicap Parking';

