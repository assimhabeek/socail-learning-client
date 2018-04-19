import { Contribution } from './contribution';
import { User } from './user';
import { Attachment } from './attachments';

export class Publication extends Contribution {
  public title: string;
  public comments: Comment[];
  public specialtyId: number;
  public moduleId: number;
  public categoryId: number;
  public attachments: Attachment[];

  constructor(id: number, date: string, title: string, user: User, categorieId: number,
    description?: string, attachments?: Attachment[],
    comments?: Comment[], specailtyId?: number, moduleId?: number, userId?: number) {
    super(id, date, user, userId, description);
    this.title = title;
    this.comments = comments;
    this.attachments = attachments;
    this.categoryId = categorieId;
    this.specialtyId = specailtyId;
    this.moduleId = moduleId;
  }
}
