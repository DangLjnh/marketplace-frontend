import { Component } from '@angular/core';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss'],
})
export class CheckoutOrderComponent {
  totalPrice: number = 0;
  constructor(private cartService: CartService) {
    this.cartService.totalPrice$.subscribe((data) => {
      this.totalPrice = data;
    });
  }
}
