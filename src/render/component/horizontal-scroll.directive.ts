import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[hrz-scroll]',
	exportAs: 'hrz-scroll',
})

export class HorizontalScroll {
	@HostBinding('scrollLeft') scrollLeft: number = 0;

	@HostListener('mousewheel') onMouseWheel(event) {
		console.log(event);
	}
}