import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { DropdownComponent }  from './dropdown.component';

import { MakeService } from './make.service';
import { ModelService } from './model.service';

import { PluckPipe } from './pluck.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    DropdownComponent,
    PluckPipe,
  ],
  providers: [
    MakeService,
    ModelService,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
