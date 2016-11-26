import { remote } from 'electron';
import { Injectable } from '@angular/core';
import { Note } from './note';

const notifier = remote.require('node-notifier');

@Injectable()
export class NotificationService {
	timeout;

	setNotification(note: Note, done: () => void = () => {}) {
		let notification = {
			title: note.title,
			message: note.description.length < 50 ? note.description : `${note.description.substr(0, 50)}...`
		},
			deltaTime = note.time.getTime() - new Date().getTime();

		if (note.description) {
			Object.assign(notification, {
				message: note.description.length < 50 ? note.description : `${note.description.substr(0, 50)}...`
			})
		}

		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			notifier.notify(notification);
			done();
		}, deltaTime);
	}
}