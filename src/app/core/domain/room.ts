export class Room {
  public id: number;
  public creator: number;
  public firstPerson: number;
  public creatorRead: boolean;
  public firstPersonRead: boolean;


  constructor(id: number, creator: number, firstPerson: number, creatorRead: boolean, firstPersonRead: boolean) {
    this.id = id;
    this.creator = creator;
    this.firstPerson = firstPerson;
    this.creatorRead = creatorRead;
    this.firstPersonRead = firstPersonRead;
  }
}
