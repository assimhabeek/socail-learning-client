import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeAnimation } from '../../shared/animations';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  animations: [fadeAnimation]
})

export class ChatComponent {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';


  constructor() { }

  /*

  loadCurrentUser() {
    this.usersService.user.subscribe(res => {
      this.currentUser = res;
      this.newMessage = new Chat(0, this.currentUser.id, 0, '', null);
    });
  }



    sendChatRequest(id: number) {
      let chatRequest: ChatRequest = {
        id: 0,
        eventType: eventTypes.CHAT_REQUESTED,
        senderId: this.currentUser.id,
        receiverId: id
      };
      this.chatService.send(chatRequest);
    }
  
    public sendMessage(value) {
      this.chatService.send({
        id: this.acceptedRequest.id,
        senderId: this.acceptedRequest.senderId == this.currentUser.id ? this.acceptedRequest.senderId : this.acceptedRequest.receiverId,
        receiverId: this.acceptedRequest.senderId == this.currentUser.id ? this.acceptedRequest.receiverId : this.acceptedRequest.senderId,
        eventType: eventTypes.CHAT_MESSAGE_RECEIVED,
        callerId: value
      });
    }
  
  
    chatRequested(request: ChatRequest) {
      const config = new MatDialogConfig();
      config.disableClose = true;
      config.width = '300px';
      config.data = this.users.find(x => x.id == request.senderId);
          this._dialog.open(ChatRequestedComponent, config).afterClosed()
            .subscribe(res => {
              request.eventType = res ? eventTypes.CHAT_ACCEPTED : eventTypes.CHAT_REJECTED;
              this.acceptedRequest = request;
              this.otherPeer = this.getSelectedUser(request.senderId);
              this.chatService.send(request);
            });
    }
  
    chatAccetpted(request: ChatRequest) {
      this.acceptedRequest = request;
          this.otherPeer = this.getSelectedUser(request.receiverId);
       
    }
  
    chatRejected(request: ChatRequest) {
      this.acceptedRequest = null;
      this.otherPeer = null;
      this.otherPeer = null;
    }
  
    endCall() {
      this.acceptedRequest.eventType = eventTypes.CHAT_REJECTED;
      this.chatService.send(this.acceptedRequest);
      this.acceptedRequest = null;
      this.otherPeer = null;
      this.otherPeer = null;
    }
  
    chatMessageReceived(request: any) {
      this.otherPeerId = request.callerId;
    }
  
      */

}



