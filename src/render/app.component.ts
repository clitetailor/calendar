import { Component, OnInit } from '@angular/core';

import { DateService } from './date.service';
import { NotificationService } from './notification.service';

import { Note } from './note';

@Component({
  selector: 'may-app',
  template: require("./app.component.html"),
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  today = new Date();
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  month: number[][];
  selectedDay: Date;

  constructor(private dateService: DateService, private notificationService: NotificationService) {
    
  }

  ngOnInit() {
    this.select(new Date);
  }

  previousMonth() {
    this.select(this.dateService.previousMonth(this.selectedDay));
  }

  nextMonth() {
    this.select(this.dateService.nextMonth(this.selectedDay));
  }

  select(day: Date | number) {
    if (day instanceof Date) {
      this.selectedDay = day;
      this.month = this.dateService.getDatesInMonth(day);
    } else if (typeof day == "number") {
      let year = this.selectedDay.getFullYear(),
          month = this.selectedDay.getMonth();

      this.select(new Date(year, month, day))
    } else {

    }
  }
}