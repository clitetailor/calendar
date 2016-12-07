let { notify } = require('./notify.js');

module.exports.nextNote = function(notes) {
	let now = new Date();
	return notes.sort((pre, next) => pre.time > next.time).find((note) => note.time > now);
}

module.exports.schedule = function(id, note) {
	clearTimeout(id);
	setTimeout(() => {
		notify(note);
	}, note.time - new Date())
}