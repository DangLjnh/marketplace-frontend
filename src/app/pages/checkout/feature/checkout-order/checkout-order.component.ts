import { Component } from '@angular/core';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { CheckoutService } from '../../data-access/checkout.service';
import { errorCode } from 'src/app/shared/model/model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  }
  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.cartService.totalPrice$.subscribe((data) => {
      this.totalPrice = data;
    });
    this.checkoutService.listDataOrder$.subscribe((data) => {
      this.dataOrders = data;
    });
    this.checkoutService.createPayMomo('a').subscribe((data) => {
      console.log(
        '🚀 ~ file: checkout-order.component.ts:39 ~ CheckoutOrderComponent ~ this.checkoutService.createPayMomo ~ data:',
        data
      );
    });
  }
}
