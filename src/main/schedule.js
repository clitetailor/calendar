let { notify } = require('./notify.js');

module.exports.nextNote = function(notes) {
	let now = new Date();
	return notes.sort((pre, next) => pre.time > next.time).find((note) => note.time > now);
}

module.exports.schedule = function(id, note) {
	clearTimeout(id);
	let deltaTime = note.time - new Date().getTime();
	
	function callback() {
		if (deltaTime < 5000) {
			id = setTimeout(() => {
				notify(note);
			}, deltaTime)
		} else {
			id = setTimeout(callback, 5000);
		}
	}
}