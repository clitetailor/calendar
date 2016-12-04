import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MayCover } from './may-cover.directive';
import { HorizontalScroll } from './horizontal-scroll.directive';
import { Dropdown } from './dropdown.directive';
import { ResizableTextarea } from './resizable-textarea.directive';

@NgModule({
	imports: [HttpModule],
	declarations: [MayCover, HorizontalScroll, Dropdown, ResizableTextarea],
	exports: [MayCover, HorizontalScroll, Dropdown, ResizableTextarea]
})

export class FeatureModule {

}