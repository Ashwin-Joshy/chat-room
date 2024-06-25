import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any = io('http://localhost:3000');
  constructor() {}
  sendMessage(message: any) {
    this.socket.emit('chat-message', message);
  }
  receiveMessage() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new-message', (data: any) => {
          console.log('Received message from Websocket Server', data);
          
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
}
