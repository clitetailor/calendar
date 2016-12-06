import { Injectable } from '@angular/core';
import { remote } from 'electron';

const fs = remote.require('fs');

@Injectable()
export class FileSystem {
	writeFile(path, data) {
		return new Promise<any>((resolve, reject) => {
			fs.writeFile(path, data, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			})
		})
	}

	readFile(path) {
		return new Promise<any>((resolve, reject) => {
			fs.readFile(path, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			})
		})
	}
}