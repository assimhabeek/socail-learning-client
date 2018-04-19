import { Contribution } from './contribution';
import { User } from './user';

export class Comment extends Contribution {

  constructor(id: number, date: string, user: User, description: string, userId?: number) {
    super(id, date, user, userId, description);
  }
}
