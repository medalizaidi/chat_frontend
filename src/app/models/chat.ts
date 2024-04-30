import { Message } from './message';
import { User } from './user';

export interface Chat {
  _id?: string;
  firstUser?: string;
  secondUser?: string;
  messages?: Message[];
}
