module.exports.nextNote = function(notes) {
	let now = new Date();
	return notes.sort((pre, next) => pre.time > next.time).find((note) => note.time > now);
}