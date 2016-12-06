import { Component, OnInit, NgZone } from '@angular/core';

import { DateService } from './date.service';
import { NotificationService } from './notification.service';

import { Note } from './note';

@Component({
  selector: 'may-app',
  template: require("./app.component.html"),
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  colorTheme = "yellowgreen";
  colorThemes = ['yellowgreen', '#00A1CB', 'orange', '#EFA09B', 'chocolate', '#01A4A4', '#E3BA6A', '#91C494', '#B69198', '#F1601D', '#17A768', 'mediumvioletred'];

  today = new Date();
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  month: number[][];
  selectedDay: Date;

  constructor(private dateService: DateService, private notificationService: NotificationService, private ngZone: NgZone) {
    setInterval(() => {
      this.ngZone.run(() => {
        this.today = new Date();
      })
    }, 1000)
  }

  ngOnInit() {
    this.selectDay(new Date);
  }

  previousMonth() {
    this.selectDay(this.dateService.previousMonth(this.selectedDay));
  }

  nextMonth() {
    this.selectDay(this.dateService.nextMonth(this.selectedDay));
  }

  selectDay(day) {
    if (typeof day == "number") {
      let year = this.selectedDay.getFullYear(),
          month = this.selectedDay.getMonth();

      this.selectDay(new Date(year, month, day))
    } else {
      this.selectedDay = new Date(day);
      this.month = this.dateService.getDatesInMonth(day);
    }
  }

  selectedTag: String = "All";

  selectTag(tag: String) {
    this.selectedTag = tag;
  }

  notes: Note[] = [{
    title: "Goto school",
    tag: "something",
    frequency: "weekly",
    date: new Date()
  }];

  edit: boolean = false;

  toggleEditor() {
    this.edit = !this.edit;
  }

  debug(...args) {
    args.forEach(arg => {
      console.log(arg, typeof(arg));
      arg.setHours(0, 0, 0, 0);
      console.log(arg);
    })
  }
}