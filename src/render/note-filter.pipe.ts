import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: "noteFilter"
})
export class NoteFilter {
	transform(notes, tag) {
		if (tag === "All") {
			return notes;
		}
		return notes.filter(note => note.tags.replace(/^\s\s*/, '').replace(/\s\s*$/, '').split(/\s+/g).indexOf(tag) !== -1);
	}
}