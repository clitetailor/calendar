import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';

@Directive({
	selector: '[button]',
	host: {
		'tabindex': '0'
	}
})

export class Button {
	constructor(private elementRef: ElementRef, private renderer: Renderer) {

	}

	@HostListener('keydown') onKeyDown() {
		this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'click');
	}
}