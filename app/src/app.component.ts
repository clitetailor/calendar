import { Component, OnInit } from '@angular/core';

import { DateService } from './date.service';
import { DataStorageService } from './data-storage.service';
import { NotificationService } from './notification.service';

import { Note } from './note';

@Component({
  selector: 'my-app',
  templateUrl: "src/app.component.html",
  styleUrls: [
    "src/app.component.css"
  ]
})
export class AppComponent implements OnInit {
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  datesInMonth: number[][];
  month: Date;

  tags = [];

  constructor(private dateService: DateService, private dataStorageService: DataStorageService, private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.getDatesInMonth(new Date());
  }

  onPreviousMonthButtonClick() {
    this.getDatesInMonth(this.dateService.getPreviousMonth(this.month));
  }

  onNextMonthButtonClick() {
    this.getDatesInMonth(this.dateService.getNextMonth(this.month));
  }

  getDatesInMonth(date: Date) {
    this.month = date;
    this.datesInMonth = this.dateService.getDatesInMonth(date);
  }


  view = "calendar";

  toggleCalendar() {
    this.view = "calendar";
  }

  toggleSchedule() {
    this.view = "timeline";
  }


  edit = false;

  toggleEditor() {
    this.edit = true;
  }



  notes = [];
  noteFilter: String = 'general/all';

  getNotes() {
    
  }

  addNote(note) {
    let currentTime = new Date();

    note = {
      title: note.title,
      description: note.description,
      time: new Date(note.year || currentTime.getFullYear(),
        note.month || currentTime.getMonth(),
        note.day || currentTime.getDate(),
        note.hours || 24,
        note.minutes || 0),
      tag: note.tag
    }

    this.notes.push(note);
    this.notes.sort((pre, next) => {
      return pre.time - next.time;
    })

    this.notificationService.setNotification(note);
    return;
  }


  getLastestNote() {
    return this.notes[0];
  }
}