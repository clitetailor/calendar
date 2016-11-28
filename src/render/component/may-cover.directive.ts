import { Directive, HostBinding } from '@angular/core';

@Directive({
	selector: 'may-cover',
	exportAs: 'cover',
	host: {
		'[style.display]': '"block"',
		'[style.position]': '"fixed"',
		'[style.height.%]': '100',
		'[style.left.px]': '0',
		'[style.right.px]': '0',
		'[style.transition.s]': '2',
		'[style.zIndex]': '100'
	}
})

export class MayCover {
	@HostBinding('style.marginTop.%') marginTop: number = 0;
	
	constructor() {
		
	}

	open() {
		this.marginTop = 0;
	}

	close() {
		this.marginTop = -100;
	}
}