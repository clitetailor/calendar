import { Component, OnInit } from '@angular/core';

import { DateService } from './date.service';

@Component({
  selector: 'my-app',
  templateUrl: "src/app.component.html",
  styleUrls :[
    "src/app.component.css"
  ]
})
export class AppComponent implements OnInit
{
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	datesInMonth: number[][];
  month: Date;

  tags = [];

  constructor(private dateService: DateService)
  {

  }

  ngOnInit()
  {
    this.getDatesInMonth(new Date());
  }

  onPreviousMonthButtonClick()
  {
    this.getDatesInMonth(this.dateService.getPreviousMonth(this.month));
  }

  onNextMonthButtonClick()
  {
    this.getDatesInMonth(this.dateService.getNextMonth(this.month));
  }

  getDatesInMonth(date: Date)
  {
    this.month = date;
    this.datesInMonth = this.dateService.getDatesInMonth(date);
  }
}