import { Contribution } from './contribution';
import { User } from './user';

export class Comment extends Contribution {

  bestAnswer: boolean;

  constructor(id: number, date: string, user: User, description: string, userId?: number) {
    super(id, date, user, userId, description);
  }
}
