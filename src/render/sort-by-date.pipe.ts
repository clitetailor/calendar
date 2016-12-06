import { Pipe } from '@angular/core';

@Pipe({
	name: "sortByDate",
	pure: false
})

export class SortByDate {
	startOfDay(day) {
		let start = new Date(day);
		start.setHours(0, 0, 0, 0);
		return start;
	}

	transform(notes) {
		let sorted = notes.sort((pre, next) => pre.time > next.time);

		let cur,
			timeline = [];

		for (let note of sorted) {
			let next = this.startOfDay(note.time);

			if (cur == undefined || next.getTime() !== cur.getTime()) {
				cur = next;
				timeline.push({
					date: cur,
					notes: [note]
				});
			} else {
				timeline[timeline.length - 1].notes.push(note);
			}
		}
		return timeline;
	}
}