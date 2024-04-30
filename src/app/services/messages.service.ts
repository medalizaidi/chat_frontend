import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  chat_id=sessionStorage.getItem('chat_id');
  private readonly URL = environment.apiUrl +'chats/'+this.chat_id +'/messages';
  private audio: HTMLAudioElement;

  constructor(private http: HttpClient) {
    this.audio = new Audio();
    this.audio.src = '../../assets/sound.mp3';
  }

  find() {
    return this.http.get<Message[]>(this.URL);
  }
  playAudio(): void {
    this.audio.play();
  }
}
