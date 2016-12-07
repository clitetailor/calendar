import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './note';

@Pipe({
	name: "tagPipe"
})

export class TagPipe implements PipeTransform {
	transform(notes: Note[]) {
		return notes.reduce((pre, cur) => {
			let tags = cur.tags.replace(/^\s\s*/, '')
				.replace(/\s\s*$/, '')
				.split(/\s+/g)
				.filter((tag) => {
					return tag !== "";
				});
			for (let tag of tags) {
				if (pre.indexOf(tag) == -1) {
					pre.push(tag);
				}
			}
			return pre;
		}, []);
	}
}