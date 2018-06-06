import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';

import * as Peer from 'simple-peer';

@Component({
  selector: 'app-chat-vedio-audio',
  templateUrl: './chat-vedio-audio.component.html',
  styleUrls: ['./chat-vedio-audio.component.scss']
})
export class ChatVedioAudioComponent implements OnInit {

  @Input() currentUser;
  @Input() acceptedRequest;
  @Output() myId: EventEmitter<string> = new EventEmitter();
  @Output() endVedioCall: EventEmitter<string> = new EventEmitter();

  @ViewChild('remoteVedio') public remoteVedio: ElementRef;
  /* @ViewChild('localVedio') public localVedio: ElementRef;*/

  @Input() public set otherPeerId(v: string) {
    if (v) {
      console.log(v);
      this.peer.signal(JSON.parse(v));
    }
  };

  public peer;
  public signeld;
  public streamIsOn;
  private _otherPeerId;

  constructor() { }

  ngOnInit() {
    this.peer = new Peer({
      initiator: this.acceptedRequest.senderId == this.currentUser.id,
      trickle: false
    });

    this.peer.on('signal', (data) => {
      console.log(data);
      this.myId.emit(JSON.stringify(data));
      this.signeld = true;
    });

    this.peer.on('connect', () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((strem) => {
          this.peer.addStream(strem);
          /*          this.localVedio.nativeElement.srcObject = strem;*/
        })
        .catch((error) => {
          console.log(error);
        });

    });

    this.peer.on('stream', (stream) => {
      console.log(stream);
      this.streamIsOn = true;
      this.remoteVedio.nativeElement.srcObject = stream;
    });



  }

  endCall() {
    this.peer.destroy();
    this.endVedioCall.emit("");
  }
}
