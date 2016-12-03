import { Pipe } from '@angular/core';

@Pipe({
	name: "sortByDate"
})

export class SortByDate {
	startOfDay(day) {
		return day.setHours(0, 0, 0, 0);
	}

	transform(notes) {
		let timeline = notes.map(note => {
			return {
				date: this.startOfDay(note.date),
				notes: []
			}
		});
		let sorted = notes.sort((pre, next) => pre.date < next.date);
		sorted.forEach(note => {
			timeline.find(group => this.startOfDay(note.date) === group.date)
				.notes.push(note);		
		})

		return timeline;
	}
}