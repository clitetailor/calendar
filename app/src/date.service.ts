import { Injectable } from "@angular/core";

@Injectable()
export class DateService
{
	getDatesInMonth(month: Date)
	{
		let firstDay = this.firstDayInMonth(month);
		let lastDay = this.lastDayInMonth(month);
		let weeks = [];

		let week = [];

		let firstDayWeekday = firstDay.getDay();
		for (let i = 0; i < firstDayWeekday; ++i)
		{
			week.push(undefined);
		}

		let daysInMonth = lastDay.getDate();
		for (let date = 1; date <= daysInMonth; ++date)
		{
			week.push(date);
			if (week.length > 6)
			{
				weeks.push(week);
				week = [];
			}
		}

		while (week.length < 7)
		{
			week.push(undefined);
		}

		return weeks;
	}

	private lastDayInMonth(month: Date)
	{
		return new Date(month.getFullYear(), month.getMonth(), 0);
	}

	private firstDayInMonth(month: Date)
	{
		return new Date(month.getFullYear(), month.getMonth() - 1, 1);
	}

	getPreviousMonth(date: Date)
	{
		return new Date(date.getFullYear(), date.getMonth() - 1);
	}

	getNextMonth(date: Date)
	{
		return new Date(date.getFullYear(), date.getMonth() + 1);
	}
}