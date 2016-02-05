var phli = require('phli')();

exports.respond = function(bot, message, response) {
	if(!response.entities.number) {
		bot.reply(message, 'You need to specify a permit number. Like this: ```get permit status for {permit number}```');
	}
	else {
		var permit_number = response.entities.number[0].value;
		phli.getPermitInfo(permit_number, {}, function (err, data) {
			if(err) {
				bot.reply(message, 'Sorry, I could not look up the status of permit number ' + permit_number + '.');
			}
			else {
				if(data.error) {
					bot.reply(message, 'Sorry, I could not look up the status of permit number ' + permit_number + '. Are you sure the number is correct?');
				}
				else {
					bot.reply(message, 'Permit number ' + permit_number + ' is ' + data.d.status + '.');
					bot.reply(message, 'http://www.phila.gov/data/Pages/default.aspx?entity=permits&eid=' + data.d.permit_number);
				}
			}
		});
		
	}
};