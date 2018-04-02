import {Contribution} from './contribution';
import {User} from './user';

export class Comment extends Contribution {

  constructor(id: number, date: string, user: User, description: string) {
    super(id, date, user, description);
  }
}
