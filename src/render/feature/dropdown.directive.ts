import { Directive, HostBinding, HostListener, Renderer, ElementRef } from '@angular/core';

@Directive({
	selector: 'dropdown, [dropdown]',
	exportAs: 'dropdown'
})

export class Dropdown {
	@HostBinding("style.visibility") visibility: String = "hidden";
	@HostListener("click", ['$event']) onClick(event: Event) {
		event.stopPropagation();
		this.close(event);
	}

	handler: Function = () => { };
	globalHandler: Function = () => { };

	open(event: Event) {
		this.handler();
		this.globalHandler();
		this.visibility = "visible";
		
		setTimeout(() => {
			this.globalHandler = this.renderer.listenGlobal('document', 'click', (event) => {
				this.close(event);
				this.globalHandler();
			});
		}, 300);
	}
	
	close(event: Event) {
		this.handler();
		this.globalHandler();
		this.visibility = "hidden";
	}

	constructor(private elementRef: ElementRef, private renderer: Renderer) {
		
	}
}