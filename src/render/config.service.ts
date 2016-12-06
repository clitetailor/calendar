import { Injectable } from '@angular/core';
import { FileSystem } from './service/file-system.service';

@Injectable()
export class ConfigService {
	constructor(private fileSystem: FileSystem) {

	}

	loadConfig() {
		return this.fileSystem.readFile('./config.json');
	}

	saveConfig(data) {
		console.log(data);
		return this.fileSystem.writeFile('./config.json', data);
	}
}