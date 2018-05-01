export class Opinion {
  public id: number;
  public userId: number;
  public publicationId: number;
  public opinion: number;
  public description: string;

  constructor(id: number, userId: number, publicationId: number, opinion: number, description?: string) {
    this.id = id;
    this.userId = userId;
    this.publicationId = publicationId;
    this.opinion = opinion;
    this.description = description;
  }

}
