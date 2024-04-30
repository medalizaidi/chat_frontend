import { Chat } from './chat';
import { User } from './user';

export interface Message {
  _id?: string;
  text?: string;
  sender: string ;
  chat: Chat ;
}
