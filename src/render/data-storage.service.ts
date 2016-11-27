import { Injectable } from '@angular/core';
import { remote, ipcRenderer } from 'electron';

@Injectable()
export class DataStorageService {

	private extractData(doc) {
		
	}

	getNotes() {
		ipcRenderer.send('get-notes');
		ipcRenderer.on('notes-reply', () => {
			
		})
	}

	addNote(note) {
		
	}

	removeNote(note) {

	}

	editNote(note) {

	}
}