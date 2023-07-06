import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { CheckoutService } from '../../data-access/checkout.service';
import { MatDialog } from '@angular/material/dialog';
import { errorCode } from 'src/app/shared/model/model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CheckoutPayMomoOrderComponent } from '../checkout-pay-momo-order/checkout-pay-momo-order.component';
import { ICartItem } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss'],
})
export class CheckoutOrderComponent implements OnInit, OnDestroy {
  @Input() subtotal: number = 0;
  @Input() totalDiscount: number = 0;
  totalPrice: number = 0;
  dataOrders: any;
  // subtotal: number = 0;
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
  ) {}
  ngOnDestroy(): void {
    this.subtotal = 0;
    this.cartService.listCheckCart = [];
  }
  ngOnInit(): void {
    this.cartService.totalPrice$.subscribe((data) => {
      this.totalPrice = data;
    });
    this.checkoutService.listDataOrder$.subscribe((data) => {
      this.dataOrders = data;
    });
    this.cartService.listCheckCart$.subscribe((listShop) => {
      listShop.forEach((data: ICartItem[]) => {
        data.forEach((item: ICartItem, index) => {
          if (item.checked === true) {
            if (item?.Product_Price_Option?.price) {
              if (data.length > 1 || index === 0) {
                this.subtotal +=
                  item.Product_Price_Option.price * item.quantity;
                this.totalDiscount +=
                  item.Product_Price_Option?.price_discount * item.quantity;
              }
            } else {
              if (data.length > 1 || index === 0) {
                this.subtotal +=
                  item.Product.Product_Detail.price_original * item.quantity;
                if (item.Product.Product_Detail?.price_discount) {
                  this.totalDiscount +=
                    item.Product.Product_Detail.price_discount * item.quantity;
                }
              }
            }
          }
        });
      });
    });
  }
}
