import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss']
})
export class ChatRoomPage implements OnInit, OnDestroy {
  messages: Message[] = [];
  chat_id = sessionStorage.getItem('chat_id');
  sendi = sessionStorage.getItem('nickname');
  user = sessionStorage.getItem('1');
  message = '';
  private subscriptions: Subscription[] = [];
  subscription: Subscription;

  
  constructor(
    private socket: Socket,
    private cdr: ChangeDetectorRef,private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.socket.connect();
    this.socket.emit('joinRoom', this.chat_id);
    this.subscription = this.route.params.subscribe(() =>{
      this.socket.emit('getAllMessages', this.chat_id);
    this.socket.on('allMessages', (messages: Message[]) => {
      this.messages = messages;
      this.cdr.detectChanges();
    });

  })
  this.socket.on('newMessage', (message: Message) => {
    this.messages.push(message);
    this.cdr.detectChanges();
  });
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscription.unsubscribe();
    this.socket.removeAllListeners('allMessages');
    this.socket.disconnect();
  }

  sendMessage(): void {
    const message = {
      text: this.message,
      sender: this.sendi
    };
    this.socket.emit('addMessage', { chatId: this.chat_id, message });
    this.message = ''; // Reset the message input field
  }  
  isTyping: boolean = false;

  startTyping(): void {
    this.isTyping = true;
  }

  stopTyping(): void {
    this.isTyping = false;
  }
}