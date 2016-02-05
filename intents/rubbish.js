var property = require('phl-property');

exports.respond = function(bot, message, response) {
	if(!response.entities.location) {
		bot.reply(message, 'You need to specify an address. Like this: ```trash pick up for {street address}```');
	}
	else {
		var address = response.entities.location[0].value;
		property.getPropertyInfo(address, function(error, response) {
		    if(!error) {
		        if(response.length > 0) {
					bot.reply(message, 'Your trash pick up day is  ' + DayOfWeek(response[0].rubbish));
					bot.reply(message, 'Your recycling pick up day is  ' + DayOfWeek(response[0].recycle));
				}
				else {
					bot.reply(message, error_message);
				}
		        
		    }
		    else {
		    	bot.reply(message, error_message);
			}
		});
	}
};

// Generic error message.
var error_message = 'Sorry. I could not find the trash pick up day for that address.';

// Utility method to generate full name of days of the week.
function DayOfWeek(abbrev) {
  switch(abbrev) {
    case 'SUN': return 'Sundays';
    case 'MON': return 'Mondays';
    case 'TUE': return 'Tuesdays';
    case 'WED': return 'Wednesdays';
    case 'THU': return 'Thursdays';
    case 'FRI': return 'Fridays';
    case 'SAT': return 'Saturdays';
  }
  return abbrev;
}
