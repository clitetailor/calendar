import { Injectable } from '@angular/core';
import { remote } from 'electron';

let { dialog } = remote;

@Injectable()

export class DialogService {
	openFiles() {
		return new Promise<any>((resolve, reject) => {
			dialog.showOpenDialog(remote.getCurrentWindow(), {
				properties: ['openFile']
			}, (files) => {
				resolve(files);
			})
		});
	}

	save() {
		return new Promise<any>((resolve, reject) => {
			dialog.showSaveDialog(remote.getCurrentWindow(), {
				title: "Save",
				filters: [
					{ name: "JSON", extensions: ['.json'] }
				]
			}, (filename) => {
				resolve(filename);
			})
		});
	}
}