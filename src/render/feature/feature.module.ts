import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MayCover } from './may-cover.directive';
import { HorizontalScroll } from './horizontal-scroll.directive';
import { Dropdown } from './dropdown.directive';
import { ResizableTextarea } from './resizable-textarea.component';
import { DateInput } from './date-input.component';
import { TimeInput } from './time-input.component';
import { TagInput } from './tag-input.component';

@NgModule({
	imports: [FormsModule, CommonModule],
	declarations: [MayCover, HorizontalScroll, Dropdown, ResizableTextarea, DateInput, TimeInput, TagInput],
	exports: [MayCover, HorizontalScroll, Dropdown, ResizableTextarea, DateInput, TimeInput, TagInput]
})

export class FeatureModule {

}