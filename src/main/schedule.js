let { notify } = require('./notify.js');

module.exports.nextNote = function(notes) {
	let now = new Date();
	return notes.sort((pre, next) => pre.time > next.time).find((note) => note.time > now);
}

module.exports.schedule = function(id, note) {
	if (id) {
		clearTimeout(id);
	}
	let deltaTime = note.time - new Date().getTime();

	return deltaTime < 30000 ? setTimeout(() => {
		notify(note.title);
	}, deltaTime) : undefined;
}