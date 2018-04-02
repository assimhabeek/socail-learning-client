import {User} from './user';
import {Attachments} from './attachments';

export class Contribution {
  id: number;
  description: string;
  date: string;
  user: User;

  constructor(id: number, date: string, user: User, description?: string) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.user = user;
  }

}
