import { Component, OnInit, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ipcRenderer } from 'electron';

import { DateService } from './date.service';
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
  datePipe;

  colorTheme = "yellowgreen";
  colorThemes = ['yellowgreen', '#00A1CB', 'orange', '#EFA09B', 'chocolate', '#01A4A4', '#E3BA6A', '#91C494', '#B69198', '#F1601D', '#17A768', 'mediumvioletred'];

  today = new Date();
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  month: number[][];
  selectedDay: Date;

  constructor(private dateService: DateService, private ngZone: NgZone, private configService: ConfigService, private userData: UserDataService, private sanitizer: DomSanitizer) {
    this.datePipe = new DatePipe(undefined);
    
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
    this.targetNote = this.curNote;
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
      this.targetNote.time = this.selectedDay;
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
    this.editor = !this.editor;
  }

  curNote: Note;
  targetNote: Note;

  done() {
    this.notes = this.notes.concat(this.targetNote);
    if (this.edit) {
      this.edit = false;
      this.removeNote(this.curNote);
      this.notes
    }
    this.saveUserData();
    this.toggleEditor();
    this.clear();
  }

  debug(...args) {
    console.log(args);
  }

  clear() {
    this.curNote = {
      title: "",
      tags: "",
      time: this.selectedDay
    }
    this.targetNote = this.curNote;
  }

  add() {
    this.toggleEditor();
  }

  cancel() {
    if (this.edit) {
      this.clear();
      this.edit = false;
    }
    this.toggleEditor();
  }

  addNote(note) {
    this.notes = this.notes.concat(note);
    this.saveUserData();
  }

  removeNote(curNote) {
    let id = this.notes.indexOf(curNote);
    if (id > -1 && id < this.notes.length) {
      this.notes.splice(id, 1);
      this.notes = [...this.notes];
    } else {
      console.log("err");
    }
    this.saveUserData();
  }

  edit: boolean = false;

  editNote(note) {
    this.edit = true;
    this.curNote = note;
    this.targetNote = Object.assign({}, note);
    this.toggleEditor();
  }

  saveUserData() {
    this.userData.saveUserData({
      notes: this.notes
    }).catch((err) => {
      console.log(err);
    })

    ipcRenderer.send('usr-data');
  }

  loadUserData() {
    this.userData.loadUserData().then(data => {
      if (data.notes) {
        this.notes = data.notes;
        this.notes.forEach(note => {
          note.time = new Date(note.time);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  importData() {
    this.userData.importData().then((data) => {
      if (data.notes) {
        this.notes = this.notes.concat(data.notes);
        this.notes.forEach(note => {
          note.time = new Date(note.time);
        })
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

  isToday(day) {
    return this.today.getDate() == day && this.today.getMonth() == this.selectedDay.getMonth() && this.today.getFullYear() == this.selectedDay.getFullYear();
  }

  hasNote(day) {
    return this.notes.map(note => note.time).findIndex((time) => {
      return time.getDate() === day && this.selectedDay.getMonth() == time.getMonth() && this.selectedDay.getFullYear() == time.getFullYear();
    }) !== -1;
  }

  hashtag(day) {
    return "#" + this.datePipe.transform(this.selectedDay, "y_MM_") + day;
  }
}