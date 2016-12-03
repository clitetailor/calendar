import { Directive, HostBinding, HostListener, Renderer, ElementRef } from '@angular/core';

@Directive({
	selector: 'dropdown, [dropdown]',
	exportAs: 'dropdown'
})

export class Dropdown {
	@HostBinding("style.visibility") visibility: String = "hidden";

	handler: Function = () => { };
	globalHandler: Function = () => { };

	open(event: Event) {
		event.stopPropagation();
		this.handler();
		this.globalHandler();
		this.visibility = "visible";

		console.log('open');
		
		this.globalHandler = this.renderer.listenGlobal('document', 'click', (event) => {
			console.log('close');
			this.close(event);
			this.globalHandler();
		});
	}
	
	close(event: Event) {
		event.stopPropagation();
		this.handler();
		this.globalHandler();
		this.visibility = "hidden";
	}

	constructor(private elementRef: ElementRef, private renderer: Renderer) {
		
	}
}