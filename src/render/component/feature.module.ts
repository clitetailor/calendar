import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MayCover } from './may-cover.directive';
import { HorizontalScroll } from './horizontal-scroll.directive';
import { Dropdown } from './dropdown.directive';

@NgModule({
	imports: [HttpModule],
	declarations: [MayCover, HorizontalScroll, Dropdown],
	exports: [MayCover, HorizontalScroll, Dropdown]
})

export class FeatureModule {

}