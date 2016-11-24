import { Injectable } from '@angular/core';
import { remote } from 'electron';

const path = require('path');
const loki = require('lokijs');

@Injectable()
export class DataStorageService {
	db;
	noteCollection;

	constructor() {
		 this.db = new loki(path.resolve(__dirname, 'note'));
		 this.noteCollection = this.db.addCollection('note');
	}

	private extractData(doc) {
		
	}

	getNotes() {
		return this.noteCollection.find({});
	}

	addNote(note) {
		this.noteCollection.insert(note);
	}

	removeNote(note) {

	}

	editNote(note) {

	}
}



// import { Injectable } from '@angular/core';
// import { remote } from 'electron';

// let loki = remote.require('loki');
// let db = new loki('loki.json');

// let notes = loki.note

// @Injectable()
// export class DataStorageService {
// 	private extractData(doc) {
		
// 	}

// 	getNotes() {
		
// 	}

// 	addNote(note) {
// 		return ;
// 	}

// 	removeNote(note) {

// 	}

// 	editNote(note) {

// 	}
// }