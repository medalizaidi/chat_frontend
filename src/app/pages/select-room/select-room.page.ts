import { Component, OnInit } from '@angular/core';

import { debounceFn } from 'debounce-decorator-ts';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ChatsService } from 'src/app/services/rooms.service';
import { Chat } from 'src/app/models/chat';
import { Message } from '../../models/message';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-select-room',
  templateUrl: './select-room.page.html',
  styleUrls: ['./select-room.page.scss'],
})
export class SelectRoomPage implements OnInit {
  typingSound: HTMLAudioElement = new Audio();
  messages: Message[] = [];
  users: User[];
  currentUser = sessionStorage.getItem('nickname');
  roomName: string;

  constructor(private userService: ChatsService,
    private navController: NavController,private messagesService: MessagesService,) { } // <1>

  ngOnInit() {
    this.searchRoom(); // <2>
     
  }

  
  @debounceFn(500)
  searchRoom() {
    this.userService.findAll().pipe(
      
    ).subscribe((users: User[]) => {
      // Filter out the currentUser
      this.users = users.filter(user => user.name !== this.currentUser);
    });
  }

  addChat( secondUser : string){
    const chat  :Chat =  {
      firstUser :this.currentUser,
      secondUser:secondUser
    }
    this.userService.addChat(chat).subscribe((resp)=>{
      sessionStorage.setItem("chat_id",resp['data']['_id']);
      if(this.currentUser==resp['data']['firstUser']){
        sessionStorage.setItem("1",resp['data']['secondUser'])
      }else{
        sessionStorage.setItem("1",resp['data']['firstUser'])
      }
      
      this.navController.navigateRoot('chat-room/' + chat._id);     })
  }
  
}
