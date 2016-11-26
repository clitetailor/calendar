import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: "noteFilter"
})
export class NoteFilter {
	transform(notes, category) {
		return notes.filter(note => note.tag === category);
	}
}