import { Component, HostListener, ElementRef, Renderer, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
	selector: 'tag-input',
	template: ``,
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
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TagInput), multi: true }]
})

export class TagInput implements ControlValueAccessor {
	@HostListener('drop', ['$event']) onDrop(event: Event) {
		event.preventDefault();
	}

	constructor(private elementRef: ElementRef, private renderer: Renderer) {

	}

	private onChangeCallback = (value: any) => { };
	private onTouchedCallback = () => { };

	private setCursorPosition(pos) {
		let range = document.createRange();
		let selection = window.getSelection();
		range.setStart(this.elementRef.nativeElement.childNodes[0], pos);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
	}

	@HostListener('keypress', ['$event']) onKeyPress(event) {
		let text = this.elementRef.nativeElement.innerText;
		let key = event.key;
		
		if (key == "Enter") {
			event.preventDefault();
		}

		if (key == " " || key == "Enter") {
			this.elementRef.nativeElement.innerHTML = "";

			let tags = text.replace(/^\s\s*/, '').replace(/\s\s*$/, '').split(/\s+/g);
			tags = tags.map(tag => {
				let wrapper = document.createElement("span");
				wrapper.classList.add('tag');
				wrapper.innerText = tag;
				return wrapper;
			}).map(tag => {
				this.renderer.projectNodes(this.elementRef.nativeElement, [tag, document.createTextNode("\u00A0")]);
			})
		}

		var range = document.createRange();
        range.selectNodeContents(this.elementRef.nativeElement);
        range.collapse(false);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
	}

	@HostListener('input') onInput() {
		let text = this.elementRef.nativeElement.innerText;
		this.onChangeCallback(text);
	}

	@HostListener('blur') onBlur() {
		this.onTouchedCallback();
	}

	@HostListener('click') onClick() {
		var range = document.createRange();
        range.selectNodeContents(this.elementRef.nativeElement);
        range.collapse(false);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
	}

	writeValue(text) {
		text = text || "";
		this.renderer.setText(this.elementRef.nativeElement, "");

		let tags = text.replace(/^\s\s*/, '').replace(/\s\s*$/, '').split(/\s+/g)
		.filter((tag) => {
			return tag !== "";
		});

		tags = tags.map(tag => {
			let wrapper = document.createElement("span");
			wrapper.classList.add('tag');
			wrapper.innerText = tag;
			return wrapper;
		}).forEach(tag => {
			this.elementRef.nativeElement.appendChild(tag);
			this.elementRef.nativeElement.appendChild(document.createTextNode("\u00A0"));
		})
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}
}