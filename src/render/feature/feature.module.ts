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
import { Button } from './button.directive';

@NgModule({
	imports: [FormsModule, CommonModule],
	declarations: [MayCover, HorizontalScroll, Dropdown, ResizableTextarea, DateInput, TimeInput, TagInput, Button],
	exports: [MayCover, HorizontalScroll, Dropdown, ResizableTextarea, DateInput, TimeInput, TagInput, Button]
})

export class FeatureModule {

}