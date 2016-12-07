import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FeatureModule } from './feature/feature.module';
import { ServiceModule } from './service/service.module';

import { AppComponent } from './app.component';
import { DateService } from './date.service';
import { SortByDate } from './sort-by-date.pipe';
import { NoteFilter } from './note-filter.pipe';
import { ConfigService } from './config.service';
import { UserDataService } from './user-data.service';
import { TagPipe } from './tag.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, FeatureModule, ServiceModule],
  declarations: [AppComponent, SortByDate, NoteFilter, TagPipe],
  providers: [DateService, ConfigService, UserDataService, ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
