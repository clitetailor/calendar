let notifier = require('node-notifier');

module.exports.notify = function(message) {
	console.log(message);
	notifier.notify({
		'title': 'May Calendar',
		'message': message
	})
}