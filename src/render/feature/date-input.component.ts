import { Component, HostListener, ElementRef, Renderer, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
	selector: 'date-input',
	template: `{{date | date: "dd-MM-y"}}`,
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
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateInput), multi: true }]
})

export class DateInput implements ControlValueAccessor {
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
			case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": {
				break;
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
				return;
			}
		}

		event.preventDefault();

		let date = this.date.getDate(), month = this.date.getMonth(), year = this.date.getFullYear();

		switch (cursorPosition) {
			case 0: {
				// dd
				switch (key) {
					case "0": {
						if (date > 10) {
							this.date.setDate(date % 10);
						}
						this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
						this.setCursorPosition(1);
						break;
					}
					case "1": {
						if (date < 10 || date > 19) {
							this.date.setDate(date % 10 + 10)
						}
						this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
						this.setCursorPosition(1);
						break;
					}
					case "2": {
						if (date < 20 || date > 29) {
							this.date.setDate(date % 10 + 20)
						}
						this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
						this.setCursorPosition(1);
						break;
					}
					case "3": {
						let lastDay = new Date(year, month + 1, 0).getDate();

						if (date % 10 > lastDay % 10) {
							this.date.setDate(lastDay);
						}
						if (date < 30) {
							this.date.setDate(date % 10 + 30);
						}
						this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
						this.setCursorPosition(1);
						break;
					}
					case "4": case "5": case "6": case "7": case "8": case "9": {
						this.date.setDate(+key);
						this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
						this.setCursorPosition(3);
						break;
					}
					default: {
						break;
					}
				}
				break;
			}
			case 1: {
				this.date.setDate(Math.floor(date / 10) * 10 + parseInt(key));
				this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
				this.setCursorPosition(3);
				break;
			}
			// MM
			case 2: case 3: {
				switch (key) {
					case "0": {
						if (month > 10) {
							this.date.setMonth(month % 10);
						}
						this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
						this.setCursorPosition(4);
						break;
					}
					case "1": {
						if (month < 2) {
							this.date.setMonth(11);
						}
						if (month < 10) {
							this.date.setMonth(month % 10 + 10)
						}
						this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
						this.setCursorPosition(4);
						break;
					}
					case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": {
						this.date.setMonth(parseInt(key) - 1);
						this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
						this.setCursorPosition(6);
						break;
					}
					default: {
						break;
					}
				}
				break;
			}
			case 4: {
				this.date.setMonth(Math.floor(month / 10) * 10 + parseInt(key) - 1);
				this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
				this.setCursorPosition(6);
				break;
			}
			// y
			case 5: case 6: {
				this.date.setFullYear(key * 1000 + year % 1000);
				this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
				this.setCursorPosition(7);
				break;
			}
			case 7: {
				this.date.setFullYear(Math.floor(year / 1000) * 1000 + parseInt(key) * 100 + year % 100);
				this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
				this.setCursorPosition(8);
				break;
			}
			case 8: {
				this.date.setFullYear(Math.floor(year / 100) * 100 + parseInt(key) * 10 + year % 10);
				this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
				this.setCursorPosition(9);
				break;
			}
			case 9: {
				this.date.setFullYear(Math.floor(year / 10) * 10 + parseInt(key));
				this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
				this.setCursorPosition(10);
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
		this.renderer.setText(this.elementRef.nativeElement, this.datePipe.transform(this.date, 'dd-MM-y'));
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}
}