var request = require('request');

// Make API call and pass JSON to callback that renders response to user.
exports.getJson = function(bot, message, url, settings, callback) {
	request(url, function(error, response, body) {
		callback(bot, message, settings, error, response, body);
	});
}

exports.postJson = function(bot, message, url, settings, payload, callback) {
  request({method: 'POST', url: url, json: payload}, function(error, response, body) {
    callback(bot, message, settings, error, response, body);
  });
}

// Titlecase text.
exports.toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Utility function to format a date.
exports.formatDate = function (date) {
  return date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
}

// Utility function to format time of day.
exports.formatTime = function (date) {
  var hours;
  if(date.getHours() == 0) {
    hours = 12;
  } else if (date.getHours() > 12) {
    hours = date.getHours() - 12;
  }
  else {
    hours = date.getHours();
  }
  var minutes = (date.getMinutes() < 9 ? "0" : "") + date.getMinutes();
  var ampm = date.getHours() < 12 ? "AM" : "PM";
  var formattedTime = hours + ":" + minutes + " " + ampm;
  return formattedTime;
}

exports.buildingCodeLookup = function(code) {
  return building[code];
}

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
