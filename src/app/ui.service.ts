import { Injectable } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { MatSpinner } from '@angular/material';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();

  constructor(private overlay: Overlay) { }

  private cdkSpinnerCreate() {
    return this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    })
  }
  showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(MatSpinner))
  }
  stopSpinner() {
    this.spinnerRef.detach();
  }
}
