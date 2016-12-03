import { Injectable } from "@angular/core";

@Injectable()
export class DateService {
	getDatesInMonth(month: Date) {
		let firstDay = this.firstDayInMonth(month);
		let lastDay = this.lastDayInMonth(month);
		let weeks = [];

		let week = [];

		let firstWeekday = firstDay.getDay();
		for (let i = 0; i < firstWeekday; ++i) {
			week.push(undefined);
		}

		let numberOfDays = lastDay.getDate();
		for (let date = 1; date <= numberOfDays; ++date) {
			week.push(date);
			if (week.length > 6) {
				weeks.push(week);
				week = [];
			}
		}
		
		if (week.length != 0) {
			while (week.length < 7) {
				week.push(undefined);
			}
			weeks.push(week);
		}

		while (weeks.length < 6) {
			weeks.push(Array.from({ length: 7 }, (v, k) => undefined));
		}

		return weeks;
	}

	private lastDayInMonth(month: Date) {
		return new Date(month.getFullYear(), month.getMonth() + 1, 0);
	}

	private firstDayInMonth(month: Date) {
		return new Date(month.getFullYear(), month.getMonth(), 1);
	}

	previousMonth(date: Date) {
		let pre = new Date(date);
		pre.setMonth(date.getMonth() - 1);
		return pre;
	}

	nextMonth(date: Date) {
		let next = new Date(date);
		next.setMonth(date.getMonth() + 1);
		return next;
	}
}