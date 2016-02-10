exports.general = {
	wit_token: process.env.wit_token || null,
	slack_token: process.env.slack_token || null,
	debug: process.env.debug || false,
	metion_types: 'direct_mention',
	no_help: 'Sorry, help is not available at this time.',
	confidence: 0.5
};

exports.error = {
	general_error_message: 'There was a problem. Deepest apologies. Please try again later.',
	no_intent: 'Sorry, I do not understand what you want to do. Try entering ```help```'

};

exports.witApiOptions = {
	  url: 'https://api.wit.ai/intents?v=' + process.env.appname,
	  headers: { 'Authorization': 'Bearer ' +  process.env.wit_token }
};

exports.apis = {
	train_times_url: 'http://www3.septa.org/hackathon/Arrivals/%station%/3',
	parking_api_url: 'https://api.phila.gov/airport-parking/v1/',
	parking_web_url: 'http://www.phl.org/passengerinfo/directionsparking/Pages/parkingGarages.aspx',
	flightinfo_url: 'http://flightinfo.phlapi.com/number/',
	service_request_url: 'http://api.phila.gov/open311/v2/requests/%id%.json'
}