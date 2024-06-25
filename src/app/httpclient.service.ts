import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVERURL } from 'environment';
import { catchError, shareReplay } from 'rxjs';

const socketURL = SERVERURL;
const expressURL = socketURL + '/api/v1';

@Injectable({
  providedIn: 'root',
})
export class HttpclientService {
  http: any;
  constructor(http: HttpClient) {
    this.http = http;
  }
  sendMessage(chat: any) {
    return this.http.post(expressURL + '/send-message', chat);
  }
  login(data: any):any {
    return this.http.post(expressURL + '/login', data).pipe(shareReplay());
  }
  signUp(data: any) {
    console.log('POSTING signup', data,expressURL);
    return this.http.post(expressURL + '/createUser', data).pipe(shareReplay());
  }
  getUser(){
    return this.http.get(expressURL + '/user').pipe(shareReplay());
  }
  getChats(){
    return this.http.get(expressURL + '/chats').pipe(shareReplay());
  }
  getPaginatedChats(skip:number, size:number){
    return this.http.get(expressURL + `/chat/page?skip=${skip}&size=${size}`).pipe(shareReplay());
  }
}
