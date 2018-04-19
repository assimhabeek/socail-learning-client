import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy, Renderer2,
  ViewChild
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('content') contentRef: ElementRef;
  disableAgree = true;
  scrollEvent;



  constructor(private _dialogRef: MatDialogRef<TermsComponent>,
    private zone: NgZone,
    private scrollService: ScrollDispatcher,
    private render: Renderer2) {
    this.listenToScroll();
  }

  ngAfterViewInit(): void {
    this.activeAgreeButton(this.contentRef);
  }

  listenToScroll() {
    this.scrollEvent = this.scrollService.scrolled(400)
      .subscribe((e: CdkScrollable) => {
        if (e) {
          this.zone.run(() => {
            this.activeAgreeButton(e.getElementRef());
          });
        }
      });
  }

  activeAgreeButton(e: ElementRef) {
    const sT = e.nativeElement.scrollTop;
    const oH = e.nativeElement.offsetHeight;
    const sH = e.nativeElement.scrollHeight;
    if (sT + oH >= sH) {
      this.disableAgree = false;
    }
  }

  disAgree() {
    this._dialogRef.close(false);
  }

  agree() {
    this._dialogRef.close(true);
  }

  ngOnDestroy(): void {
    this.scrollEvent.unsubscribe();
  }

  scrollDown() {
    this.contentRef.nativeElement.scrollTop += this.contentRef.nativeElement.offsetHeight;
  }
}
