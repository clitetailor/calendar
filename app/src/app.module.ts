import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { DateService } from './date.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  providers: [ DateService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule
{

}
