export class Room {
  public id: number;
  public creator: number;
  public firstPerson: number;

  constructor(id: number, creator: number, firstPerson: number) {
    this.id = id;
    this.creator = creator;
    this.firstPerson = firstPerson;
  }
}
