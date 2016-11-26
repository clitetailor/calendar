import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DateService } from './date.service';
import { NoteService } from './note.service';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent],
  providers: [DateService, NoteService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
