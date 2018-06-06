import { Component, HostBinding, OnInit } from '@angular/core';
import { routerAnimation } from '../../shared/animations';

@Component({
  selector: 'app-no-connection',
  template: `
    <mat-card class="sl-message">
      <mat-card-header>
        <h1>{{'NO_CONNECTION' | translate}}</h1>
      </mat-card-header>
      <mat-card-content>
        <p>{{'CONNECTION_ERROR' | translate}}</p>
      </mat-card-content>
      <mat-card-actions>
        <div class="center">
          <a mat-raised-button color="primary" routerLink="/index">
            <mat-icon>refresh</mat-icon>
            {{'TRY_AGAIN' | translate}}</a>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  animations: [routerAnimation]
})
export class NoConnectionComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor() {
  }

  ngOnInit() {
  }

}
