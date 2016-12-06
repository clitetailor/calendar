import { Component, HostListener, ElementRef, Renderer, forwardRef, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
	selector: 'time-input',
	template: `{{date | date: "HH:mm:ss"}}`,
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
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimeInput), multi: true }],
	encapsulation: ViewEncapsulation.Emulated
})

export class TimeInput implements ControlValueAccessor {
	@HostListener('drop', ['$event']) onDrop(event: Event) {
		event.preventDefault();
	}

	private datePipe: DatePipe;

	constructor(private elementRef: ElementRef, private renderer: Renderer) {
		this.datePipe = new DatePipe(undefined);
	}

	private onChangeCallback = (value: any) => { };
	private onTouchedCallback = () => { };

	private date: Date;

	private setCursorPosition(pos) {
		let range = document.createRange();
		let selection = window.getSelection();
		range.setStart(this.elementRef.nativeElement.childNodes[0], pos);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
	}

	@HostListener('keydown', ['$event']) onKeyPress(event) {
		let cursorPosition = document.getSelection().getRangeAt(0).endOffset;
		let key = event.key;
		switch (key) {
			case "ArrowLeft": case "ArrowRight": case "ArrowUp": case "ArrowDown": case "Tab": {
				return;
			}
			case " ":
			case "Enter": {
				event.preventDefault();
				let fire = new KeyboardEvent("keydown", {
					key: "Tab",
				})
				this.elementRef.nativeElement.dispatchEvent(fire);
				return;
			}
			default: {
				event.preventDefault();
				break;
			}
		}

		if (isNaN(key)) {
			return;
		}

		let hours = this.date.getHours(), minutes = this.date.getMinutes(), seconds = this.date.getSeconds();

		switch (cursorPosition) {
			case 0: {
				// HH
				if (key < 3) {
					hours = parseInt(key) * 10 + hours % 10;
					if (hours > 23) {
						hours = 23;
					}
					this.date.setHours(hours);
					this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'HH:mm:ss'));
					this.setCursorPosition(1);
				} else {
					this.date.setHours(parseInt(key));
					this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'HH:mm:ss'));
					this.setCursorPosition(3);
				}
				break;
			}
			case 1: {
				this.date.setHours(Math.floor(hours / 10) * 10 + parseInt(key));
				this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'HH:mm:ss'));
				this.setCursorPosition(3);
				break;
			}
			// mm
			case 2: case 3: {
				if (key < 6) {
					this.date.setMinutes(parseInt(key) * 10 + minutes % 10);
					this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'HH:mm:ss'));
					this.setCursorPosition(4);
				}
				break;
			}
			case 4: {
				this.date.setMinutes(Math.floor(minutes / 10) * 10 + parseInt(key));
				this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'HH:mm:ss'));
				this.setCursorPosition(6);
				break;
			}
			// ss
			case 5: case 6: {
				if (key < 6) {
					this.date.setSeconds(parseInt(key) * 10 + seconds % 10);
					this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'HH:mm:ss'));
					this.setCursorPosition(7);
				}
				break;
			}
			case 7: {
				this.date.setSeconds(Math.floor(seconds / 10) * 10 + parseInt(key));
				this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'HH:mm:ss'));
				this.setCursorPosition(8);
				break;
			}
			default: {
				let fire = new KeyboardEvent("keydown", {
					key: "Tab"
				})
				document.dispatchEvent(fire);
				break;
			}
		}
		this.onChangeCallback(this.date);
	}

	@HostListener('blur') onBlur() {
		this.onTouchedCallback();
	}

	writeValue(date: Date) {
		this.date = date;
		this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'HH:mm:ss'));
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}
}