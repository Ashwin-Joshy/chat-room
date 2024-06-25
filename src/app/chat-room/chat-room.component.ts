import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from '../socket.service';
import { HttpclientService } from '../httpclient.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent {
  @ViewChild('chats')
  containerRef!: ElementRef;
  @ViewChild('textArea')
  bottomDivRef!: ElementRef;
  @ViewChild('messageToSend')
  inputRef!: ElementRef;
  senderName = 'iMA';
  createdAt = Date.now();
  ownerName = 'You';
  loading = false;
  size = 50;
  skip = 0;
  totalChatsInServer = 1000000;
  messages = [
    {
      message: 'Hello',
      userName: 'iMA',
      userEmail: 'test',
      createdAt: Date.now(),
    },
  ];
  senderImage = 'https://www.w3schools.com/howto/img_avatar.png';
  room = {
    name: 'Angular',
  };
  activeUserEmail = '';
  @ViewChild('flexContainer') flexContainer!: ElementRef;
  constructor(private socket: SocketService, private http: HttpclientService) {}
  ngOnInit() {
    //user detail
    this.http.getUser().subscribe((data: any) => {
      this.ownerName = data.name;
      this.activeUserEmail = data.email;
    });
    //chats
    // this.http.getChats().subscribe((data: any) => {
    //   this.messages = data;
    //   setTimeout(() => this.scrollToBottom(), 1);
    // });
    //paginated chats
    this.loading = true;
    console.log('Loading chats');
    this.http.getPaginatedChats(this.skip, this.size).subscribe((data: any) => {
      console.log('Chats loaded', data);

      this.messages = data.chats.reverse();
      this.skip += this.size;
      this.totalChatsInServer = data.lastPage * this.size;
      setTimeout(() => this.scrollToBottom(), 1);
      this.loading = false;
    });
    //subscribing
    this.socket.receiveMessage().subscribe((message: any) => {
      this.messages.push(message);
      console.log('Message received', message);
      console.log('Active user email', this.activeUserEmail);
      console.log('send user email', message.userEmail);
      console.log('chec', message.userEmail == this.activeUserEmail);
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }
  sendMessage(messageToSend: any) {
    console.log(messageToSend.value);
    let message = messageToSend.value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
    const messageToServer = {
      message,
      createdAt: Date.now(),
      group: 12,
    };
    messageToSend.value = '';
    //adjusting text area size to normal
    this.adjustSize(this.inputRef.nativeElement);
    this.http.sendMessage(messageToServer).subscribe((data: any) => {});
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    this.containerRef.nativeElement.scrollTop =
      this.containerRef.nativeElement.scrollHeight;
  }
  adjustSize(textarea: HTMLTextAreaElement) {
    const maxHeight = 100;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }
  getUserDetails() {}
  loadMoreChats() {
    if (!this.loading && this.skip <= this.totalChatsInServer) {
      this.loading = true;
      console.log('Loading more chats');
      this.http
        .getPaginatedChats(this.skip, this.size)
        .subscribe((data: any) => {
          this.messages = [...data.chats.reverse(), ...this.messages];
          this.skip += this.size;
          this.loading = false;
        });
    }
  }
  onScroll() {
    const scrollTop = this.containerRef.nativeElement.scrollTop;
    const scrollHeight = this.containerRef.nativeElement.scrollHeight;
    const clientHeight = this.containerRef.nativeElement.clientHeight;
    // console.log('client height', clientHeight);
    // console.log('scroll height', scrollHeight);
    // console.log('scroll top', scrollTop);
    //console.log('scroll to bottom', scrollTop);
    //console.log('Remaining',scrollHeight/(scrollTop+1));

    if (scrollTop <= scrollHeight * 0.1) {
      this.loadMoreChats();
    }
  }
  onMultiLineCheck(multiLineEvent: any) {
    console.log('Multiline event', multiLineEvent);

    if (multiLineEvent) {
      this.flexContainer.nativeElement.style.flexDirection = 'column';
    }
    else{
      this.flexContainer.nativeElement.style.flexDirection = 'row';
    }
  }
}
