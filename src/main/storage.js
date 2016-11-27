const path = require('path');
const NeDB = require('nedb');
const db = new NeDB({
	filename: path.resolve('./data/index'),
	autoload: true
});


module.exports.getNotes = function() {
	return Promise((resolve, reject) => {
		db.find({}, (err, notes) => {
			if (err) {
				reject(err);
			}

			resolve(notes);
		})
	})
}

module.exports.addNote = function(note) {
	return Promise((resolve, reject) => {
		db.insert(note, (err) => {
			reject(err);
		});
	})
}