import {Contribution} from './contribution';
import {User} from './user';
import {Attachments} from './attachments';

export class Publication extends Contribution {
  public title: string;
  public comments: Comment[];
  public attachments: Attachments[];

  constructor(id: number, date: string, title: string, user: User,
              description?: string, attachments?: Attachments[],
              comments?: Comment[]) {
    super(id, date, user, description);
    this.title = title;
    this.comments = comments;
    this.attachments = attachments;
  }
}
