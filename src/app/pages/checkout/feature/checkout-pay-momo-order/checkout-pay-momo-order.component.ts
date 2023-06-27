import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckoutService } from '../../data-access/checkout.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout-pay-momo-order',
  templateUrl: './checkout-pay-momo-order.component.html',
  styleUrls: ['./checkout-pay-momo-order.component.scss'],
})
export class CheckoutPayMomoOrderComponent implements OnInit {
  urlPayMomo: string = '';

  constructor(
    public dialogRef: MatDialogRef<CheckoutPayMomoOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private checkoutService: CheckoutService
  ) {}
  ngOnInit(): void {
    this.urlPayMomo = this.checkoutService.urlPayMomo;
  }
}
