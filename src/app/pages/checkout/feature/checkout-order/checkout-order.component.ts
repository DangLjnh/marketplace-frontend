import { Component } from '@angular/core';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { CheckoutService } from '../../data-access/checkout.service';
import { MatDialog } from '@angular/material/dialog';
import { errorCode } from 'src/app/shared/model/model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CheckoutPayMomoOrderComponent } from '../checkout-pay-momo-order/checkout-pay-momo-order.component';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss'],
})
export class CheckoutOrderComponent {
  totalPrice: number = 0;
  dataOrders: any;
  submitOrder() {
    if (this.checkoutService.choosePayment === 'cash') {
      this.checkoutService.createOrder(this.dataOrders).subscribe((data) => {
        if (+data.EC === errorCode.SUCCESS) {
          this.toastrService.success(data.EM);
          this.router.navigate(['customer/account/purchase']);
        } else {
          this.toastrService.error(data.EM);
        }
      });
    }
    if (this.checkoutService.choosePayment === 'momo') {
      this.checkoutService
        .createPayMomo({ totalPrice: this.totalPrice })
        .subscribe((data) => {
          if (data) {
            // window.open(data.DT, '_blank');
            // this.router.navigate([data.DT]);
            this.checkoutService.urlPayMomo = data.DT;
            this.dialog.open(CheckoutPayMomoOrderComponent, {
              data: {
                type: 'create',
              },
            });
          }
        });
    }
  }
  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private toastrService: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.cartService.totalPrice$.subscribe((data) => {
      this.totalPrice = data;
    });
    this.checkoutService.listDataOrder$.subscribe((data) => {
      this.dataOrders = data;
    });
  }
}
