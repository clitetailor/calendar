import { Injectable } from '@angular/core';
import { FileSystem } from './service/file-system.service';

@Injectable()
export class UserDataService {
	constructor(private fileSystem: FileSystem) {

	}

	loadConfig() {
		return this.fileSystem.readFile('./usr-data.json')
			.then((data) => {
				return JSON.parse(data);
			});
	}

	saveConfig(jsonData) {
		let data = JSON.stringify(jsonData);
		return this.fileSystem.writeFile('./config.json', data);
	}
}