import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeAnimation } from '../../shared/animations';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [`.sl-container{
    max-width: 800px;
  margin: auto;
  display: block;
  padding: 64px !important;
}`],
  animations: [fadeAnimation]
})

export class ChatComponent {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';


  constructor() { }


}



