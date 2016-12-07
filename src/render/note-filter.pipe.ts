import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: "noteFilter"
})
export class NoteFilter {
	transform(notes, tag) {
		return notes.filter(note => note.tag.split(" ").indexOf(tag) !== -1);
	}
}