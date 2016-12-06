import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FeatureModule } from './feature/feature.module';

import { AppComponent } from './app.component';
import { DateService } from './date.service';
import { NotificationService } from './notification.service';
import { SortByDate } from './sort-by-date.pipe';
import { NoteFilter } from './note-filter.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, FeatureModule],
  declarations: [AppComponent, SortByDate, NoteFilter],
  providers: [DateService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
