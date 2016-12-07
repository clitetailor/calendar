import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './note';

@Pipe({
	name: "tagPipe"
})

export class TagPipe implements PipeTransform {
	transform(notes: Note[]) {
		let tags = notes.reduce((pre, next) => {
			let tags = next.tags.replace(/^\s\s*/, '')
				.replace(/\s\s*$/, '')
				.split(/\s+/g)
				.filter((tag) => {
					return tag !== "";
				});
			return pre.concat(tags);
		}, []).sort();

		let cur = undefined;
		let arr = []
		for (let tag of tags) {
			if (cur === undefined || cur.name !== tag) {
				cur = {
					name: tag,
					count: 1
				};
				arr.push(cur);
			} else {
				cur.count++;
			}
		}
		return arr;
	}
}