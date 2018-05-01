import { User } from './user';
import { Attachment } from './attachments';

export class Contribution {
  id: number;
  description: string;
  userId: number;
  date: string;
  public user: User;

  constructor(id: number, date: string, user: User, userId?: number, description?: string) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.user = user;
    this.userId = userId;
  }

}
