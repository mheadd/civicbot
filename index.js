var wit = require('node-wit');
var Botkit = require('Botkit');
var request = require('request');
var intents = require('intents');
var config = require('config');

var controller = Botkit.slackbot({ debug: config.general.debug });
var bot = controller.spawn({ token: config.general.slack_token }).startRTM();

// User asks for help.
controller.hears(['help'], config.general.metion_types, function(bot, message) {
	request(config.witApiOptions, function(error, response, body) {
		helpMessage(error, response, body, bot, message);
	});
});

// All other text gets routed to Wit.AI to retireve appropriate intent.
controller.hears(['(.*)'], config.general.metion_types, function(bot, message) {
	wit.captureTextIntent(config.general.wit_token, message.text, function (err, res) {
	    if (err) {
	    	bot.reply(message, config.error.general_error_message);
	    }
	    else {
	    	var response = parseWitResponse(res);
		    if (!response.intent) {
		    	bot.reply(message, config.error.no_intent);
		    }
		    else if(response.confidence < config.general.confidence ) {
				bot.reply(message, "I\'m not sure what this means ```" + response.text + "``` Try asking for help.");
			}
		    else {
		    	try {
		    		intents[response.intent].respond(bot, message, response);
		    	}
		    	catch(e) {
		    		console.log(e.message);
		    		bot.reply(message, config.error.no_intent);
		    	}
		    }
	    }
	});
});

// Return a simplified object based on raw Wit.AI reponse.
function parseWitResponse(res) {
	var response = {};
	response.text = res._text;
	response.confidence = res.outcomes[0].confidence || null;
	response.intent = res.outcomes[0].intent || null;
	response.entities = res.outcomes[0].entities || {};
	return response;
};

// Retrieve Wit.AI intents with documentation and send to user.
function helpMessage(error, response, body, bot, message) {
	var text; 
	if (!error && response.statusCode == 200) {
	    var intents = JSON.parse(body);
	    text = 'Here are some examples of things you can ask me for:\n';
	    for(intent in intents) {
	    	if(intents[intent].name == 'help') {
	    		continue;
	    	}
			text += '* ' + intents[intent].doc + '\n';
		}
	}
	else {
		text = config.general.no_help;
	}
	bot.reply(message, text);
};