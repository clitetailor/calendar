import { Injectable } from '@angular/core';
import { FileSystem } from './service/file-system.service';
import { DialogService } from './service/dialog.service';

@Injectable()
export class UserDataService {
	constructor(private fileSystem: FileSystem, private dialogService: DialogService) {

	}

	loadUserData() {
		return this.fileSystem.readFile('./usr-data.json')
			.then((data) => {
				return JSON.parse(data);
			});
	}

	saveUserData(jsonData) {
		let data = JSON.stringify(jsonData);
		return this.fileSystem.writeFile('./usr-data.json', data);
	}

	exportData(jsonData) {
		return this.dialogService.save().then((file) => {
			let data = JSON.stringify(jsonData);
			return this.fileSystem.writeFile(file, data);
		})
	}

	importData() {
		return this.dialogService.openFiles().then((files) => {
			let file = files[0];
			return this.fileSystem.readFile(file)
				.then((data) => {
					return JSON.parse(data);
				});
		});
	}
}