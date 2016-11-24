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