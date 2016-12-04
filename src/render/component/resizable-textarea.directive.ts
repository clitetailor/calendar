import { Directive, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
	selector: 'resizable-textarea, [resizable-textarea]',
	host: {
		'contenteditable': 'true',
		'[style.outline]': '"none"'
	},
	
})

export class ResizableTextarea {
	@HostListener('drop', ['$event']) onDrop(event: Event) {
		event.preventDefault();
	}

	constructor() {

	}
}