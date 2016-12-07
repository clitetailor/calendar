import { Component, OnInit, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { DateService } from './date.service';
import { NotificationService } from './notification.service';
import { ConfigService } from './config.service';
import { UserDataService } from './user-data.service';

import { Note } from './note';
import { SortByDate } from './sort-by-date.pipe';

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

  constructor(private dateService: DateService, private notificationService: NotificationService, private ngZone: NgZone, private configService: ConfigService, private userData: UserDataService) {
    setInterval(() => {
      this.ngZone.run(() => {
        this.today = new Date();
      })
    }, 1000)

    this.loadConfig();
    this.loadUserData();

    this.curNote = {
      title: "",
      tags: "",
      time: this.selectedDay
    }
  }

  changeColorTheme(colorTheme) {
    this.colorTheme = colorTheme;
    this.saveConfig();
  }

  ngOnInit() {
    this.selectDay(new Date);
  }

  loadConfig() {
    this.configService.loadConfig().then(data => {
      if (data.colorTheme) {
        this.colorTheme = data.colorTheme;
      }
    }).catch(err => console.log(err));
  }

  saveConfig() {
    this.configService.saveConfig({
      colorTheme: this.colorTheme
    }).catch(err => console.log(err));
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
      this.curNote.time = this.selectedDay;
      this.month = this.dateService.getDatesInMonth(day);
    }
  }

  selectedTag: String = "All";

  selectTag(tag: String) {
    this.selectedTag = tag;
  }

  notes: Note[] = [];

  editor: boolean = false;

  toggleEditor() {
    if (this.edit) {
      return;
    }
    this.editor = !this.editor;
  }

  curNote: Note;

  done() {
    if (this.edit) {
      this.edit = false;
      this.toggleEditor();
    } else {
      this.addNote();
    }
  }

  addNote() {
    this.notes = this.notes.concat(this.curNote);
    this.curNote = {
      title: "",
      tags: "",
      time: this.selectedDay
    }
    this.toggleEditor();
    this.saveUserData();
  }

  removeNote(index) {
    this.notes.splice(index, 1);
    this.notes = [...this.notes];
    this.saveUserData();
  }

  edit: boolean = false;

  editNote(index) {
    this.toggleEditor();
    this.edit = true;
    this.curNote = this.notes[index];
  }

  saveUserData() {
    this.userData.saveUserData({
      notes: this.notes
    }).catch((err) => {
      console.log(err);
    })
  }

  loadUserData() {
    this.userData.loadUserData().then(data => {
      if (data.notes) {
        this.notes = data.notes;
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  importData() {
    this.userData.importData().then((data) => {
      if (data.notes) {
        this.notes = this.notes.concat(data.notes);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  exportData() {
    this.userData.exportData({
      notes: this.notes
    }).catch((err) => {
      console.log(err)
    });
  }
}