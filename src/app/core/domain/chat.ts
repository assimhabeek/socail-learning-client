export class Chat {
  public id: number;
  public sender: number;
  public message: string;
  public messageDate: string;
  public roomId: number;


  constructor(id: number, senderId: number, message: string, messageDate: string, roomId: number) {
    this.id = id;
    this.sender = senderId;
    this.message = message;
    this.messageDate = messageDate;
    this.roomId = roomId;
  }
}
