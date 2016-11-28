import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MayCover } from './may-cover.directive';

@NgModule({
	imports: [HttpModule],
	declarations: [MayCover],
	exports: [MayCover]
})

export class FeatureModule {

}