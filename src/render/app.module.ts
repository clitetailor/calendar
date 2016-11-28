import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FeatureModule } from './component/feature.module';

import { AppComponent } from './app.component';
import { DateService } from './date.service';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, FeatureModule],
  declarations: [AppComponent],
  providers: [DateService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
