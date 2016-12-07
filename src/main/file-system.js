let fs = require('fs');

module.exports.readFile = function(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		})
	})
}

module.exports.loadUserData = function() {
	return module.exports.readFile('./usr-data.json')
		.then((data) => {
			return JSON.parse(data);
		});
}

module.exports.getNotes = function() {
	return module.exports.loadUserData().then((data) => {
		let notes = data.notes;
		notes.forEach(note => note.time = new Date(note.time));
		return notes;
	});
}