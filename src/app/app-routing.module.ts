import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RouteGuardService } from './route-guard.service';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatRoomComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'login',
    component: AuthenticationComponent,
  },
  {
    path: 'signup',
    component: AuthenticationComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
