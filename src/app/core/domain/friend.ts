export class Friend {
  public id: number;
  public senderId: number;
  public receiverId: number;
  public state: number;

  constructor(id: number, senderId: number, receiverId: number, state: number) {
    this.id = id;
    this.receiverId = receiverId;
    this.senderId = senderId;
    this.state = state;
  }
}
