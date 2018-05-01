export class Chat {
  public id: number;
  public senderId: number;
  public receiverId: number;
  public message: string;
  public messageDate: string;

  constructor(id: number, senderId: number, receiverId: number, message: string, messageDate: string) {
    this.id = id;
    this.senderId = senderId;
    this.message = message;
    this.messageDate = messageDate;
  }
}
