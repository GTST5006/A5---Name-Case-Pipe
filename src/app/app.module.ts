import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NameCasePipe } from './_pipes/name-case.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    NameCasePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule    
  ],
  providers: [] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
