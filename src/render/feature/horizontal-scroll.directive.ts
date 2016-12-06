import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
	selector: '[hrz-scroll]',
	exportAs: 'hrz-scroll',
})

export class HorizontalScroll {
	constructor(private elementRef: ElementRef) {

	}

	@HostBinding('scrollLeft') scrollLeft: number = 0;

	@HostListener('mousewheel', ['$event']) onMouseWheel(event) {
		let scrollWidth = this.elementRef.nativeElement.scrollWidth,
			delta = event.deltaY + event.deltaX;

		if (this.scrollLeft < 0 && delta < 0) {
			
		} else if (this.scrollLeft > scrollWidth && delta > 0) {
			
		} else {
			this.scrollLeft += delta;
		}
	}
}