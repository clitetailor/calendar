import { Component, HostListener, ElementRef, Renderer, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
	selector: 'resizable-textarea',
	template: "",
	styles: [`
		:host {
			display: block;
			outline: none;
		}

		:host:empty::before {
			content: attr(placeholder);
			color: #aaa;
		}
	`],
	host: {
		'contenteditable': 'true',
	},
	providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ResizableTextarea), multi: true}]
})

export class ResizableTextarea implements ControlValueAccessor {
	@HostListener('drop', ['$event']) onDrop(event: Event) {
		event.preventDefault();
	}

	constructor(private elementRef: ElementRef, private renderer: Renderer) {

	}

	private onChangeCallback = (value: any) => { };
	private onTouchedCallback = () => { };

	@HostListener('input') onInput() {
		this.onChangeCallback(this.elementRef.nativeElement.innerText);
	}

	@HostListener('blur') onBlur() {
		this.onTouchedCallback();
	}

	writeValue(value: any) {
		this.renderer.setText(this.elementRef.nativeElement, value);
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}
}