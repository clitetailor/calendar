import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DateService } from './date.service';
import { DataStorageService } from './data-storage.service';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent],
  providers: [DateService, DataStorageService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
