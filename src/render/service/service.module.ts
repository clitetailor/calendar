import { NgModule } from '@angular/core';

import { FileSystem } from './file-system.service';
import { DialogService } from './dialog.service';

@NgModule({
	providers: [FileSystem, DialogService]
})

export class ServiceModule {
	
}