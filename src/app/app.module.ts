import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'
import { ChatRoomModule } from './chat-room/chat-room.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiLineCheckDirective } from './multi-line-check.directive';

@NgModule({
  declarations: [AppComponent, AuthenticationComponent],
  imports: [BrowserModule, AppRoutingModule, NgbDropdown,MatMenuModule, 
    MatButtonModule,ChatRoomModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtService, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
