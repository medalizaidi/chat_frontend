import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient) { }

  find(params?) {
    return this.http.get<Chat[]>(environment.apiUrl + 'Chats/', {params});
  }

  findById(id: string) {
    return this.http.get<Chat>(environment.apiUrl + 'Chats/' + id);
  }
  // written by @Hamdi
  addChat(item: Chat) {
    return this.http.post(environment.apiUrl + 'Chats/', item);
  }
  // written by @Hamdi
  findAll() {
    return this.http.get<User[]>(environment.apiUrl + 'users');
  }
  // written by @Hamdi
  CreateCompte(username : string){
    const user={
      name  : username
    }
    return this.http.post<User>(environment.apiUrl + 'users',user);
  }
  

}
