import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatRoomComponent } from './chat-room.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtService } from '../jwt.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from '../app.component';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  declarations: [ChatRoomComponent],
  imports: [
    BrowserModule, MatMenuModule, MatButtonModule,CommonModule,
    MatIconModule, BrowserAnimationsModule, InfiniteScrollModule,UtilitiesModule
],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtService, multi: true }],
  bootstrap: [ChatRoomComponent],
  exports: [ChatRoomComponent]
})
export class ChatRoomModule {}
