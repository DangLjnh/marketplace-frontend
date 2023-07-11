import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckoutService } from '../../data-access/checkout.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-checkout-pay-momo-order',
  templateUrl: './checkout-pay-momo-order.component.html',
  styleUrls: ['./checkout-pay-momo-order.component.scss'],
})
export class CheckoutPayMomoOrderComponent implements OnInit, OnDestroy {
  urlPayMomo!: SafeResourceUrl;
  idInterval: any;
  successPay: boolean = false;
  dataOrders: any;

  constructor(
    public dialogRef: MatDialogRef<CheckoutPayMomoOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private checkoutService: CheckoutService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnDestroy(): void {
    clearInterval(this.idInterval);
  }
  ngOnInit(): void {
    this.urlPayMomo = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.checkoutService.urlPayMomo.payUrl
    );
    this.checkoutService.listDataOrder$.subscribe((data) => {
      this.dataOrders = data;
    });
    const rawDataMomo = {
      partnerCode: this.checkoutService.urlPayMomo.partnerCode,
      requestId: this.checkoutService.urlPayMomo.requestId,
      orderId: this.checkoutService.urlPayMomo.orderId,
      signature: this.checkoutService.urlPayMomo.signature,
      accessKey: this.checkoutService.urlPayMomo.accessKey,
    };
    if (this.urlPayMomo) {
      this.idInterval = setInterval(() => {
        this.checkoutService.checkPayMomo(rawDataMomo).subscribe((data) => {
          if (data.DT.resultCode === 0) {
            clearInterval(this.idInterval);
            this.successPay = true;
            this.checkoutService
              .createOrderAlreadyPay(this.dataOrders)
              .subscribe((data) => {
                if (+data.EC === 0) {
                  window.location.href = `${environment.frontendUrl}/customer/account/purchase`;
                  // 'http://localhost:4200/customer/account/purchase';
                } else {
                }
              });
          }
        });
      }, 3000);
    }
    this.dialogRef.afterClosed().subscribe(() => {
      clearInterval(this.idInterval);
    });
  }
}
