import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy, Renderer2,
  ViewChild
} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/scrolling';

class Term {
  title: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  description: string;
}

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('content') contentRef: ElementRef;
  disableAgree = true;
  scrollEvent;

  terms: Term[] = [
    {
      title: 'Welcome to Google!',
      description: 'Thanks for using our products and services (“Services”). The Services are provided ' +
      'by Google LLC (“Google”), located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States.' +
      'By using our Services, you are agreeing to these terms. Please read them carefully.' +
      'Our Services are very diverse, so sometimes additional terms or product requirements ' +
      '(including age requirements) may apply. Additional terms will be available with the ' +
      'relevant Services, and those additional terms become part of your agreement with us if you use those Services.'
    },
    {
      title: 'Welcome to Google!',
      description: 'Thanks for using our products and services (“Services”). The Services are provided ' +
      'by Google LLC (“Google”), located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States.' +
      'By using our Services, you are agreeing to these terms. Please read them carefully.' +
      'Our Services are very diverse, so sometimes additional terms or product requirements ' +
      '(including age requirements) may apply. Additional terms will be available with the ' +
      'relevant Services, and those additional terms become part of your agreement with us if you use those Services.'
    },
    {
      title: 'Welcome to Google!',
      description: 'Thanks for using our products and services (“Services”). The Services are provided ' +
      'by Google LLC (“Google”), located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States.' +
      'By using our Services, you are agreeing to these terms. Please read them carefully.' +
      'Our Services are very diverse, so sometimes additional terms or product requirements ' +
      '(including age requirements) may apply. Additional terms will be available with the ' +
      'relevant Services, and those additional terms become part of your agreement with us if you use those Services.'
    },
    {
      title: 'Welcome to Google!',
      description: 'Thanks for using our products and services (“Services”). The Services are provided ' +
      'by Google LLC (“Google”), located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States.' +
      'By using our Services, you are agreeing to these terms. Please read them carefully.' +
      'Our Services are very diverse, so sometimes additional terms or product requirements ' +
      '(including age requirements) may apply. Additional terms will be available with the ' +
      'relevant Services, and those additional terms become part of your agreement with us if you use those Services.'
    },
    {
      title: 'Welcome to Google!',
      description: 'Thanks for using our products and services (“Services”). The Services are provided ' +
      'by Google LLC (“Google”), located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States.' +
      'By using our Services, you are agreeing to these terms. Please read them carefully.' +
      'Our Services are very diverse, so sometimes additional terms or product requirements ' +
      '(including age requirements) may apply. Additional terms will be available with the ' +
      'relevant Services, and those additional terms become part of your agreement with us if you use those Services.'
    },
    {
      title: 'Welcome to Google!',
      description: 'Thanks for using our products and services (“Services”). The Services are provided ' +
      'by Google LLC (“Google”), located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States.' +
      'By using our Services, you are agreeing to these terms. Please read them carefully.' +
      'Our Services are very diverse, so sometimes additional terms or product requirements ' +
      '(including age requirements) may apply. Additional terms will be available with the ' +
      'relevant Services, and those additional terms become part of your agreement with us if you use those Services.'
    },
    {
      title: 'Welcome to Google!',
      description: 'Thanks for using our products and services (“Services”). The Services are provided ' +
      'by Google LLC (“Google”), located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States.' +
      'By using our Services, you are agreeing to these terms. Please read them carefully.' +
      'Our Services are very diverse, so sometimes additional terms or product requirements ' +
      '(including age requirements) may apply. Additional terms will be available with the ' +
      'relevant Services, and those additional terms become part of your agreement with us if you use those Services.'
    },
    {
      title: 'Welcome to Google!',
      description: 'Thanks for using our products and services (“Services”). The Services are provided ' +
      'by Google LLC (“Google”), located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States.' +
      'By using our Services, you are agreeing to these terms. Please read them carefully.' +
      'Our Services are very diverse, so sometimes additional terms or product requirements ' +
      '(including age requirements) may apply. Additional terms will be available with the ' +
      'relevant Services, and those additional terms become part of your agreement with us if you use those Services.'
    }


  ];


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
