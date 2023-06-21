import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-total-price',
  templateUrl: './cart-total-price.component.html',
  styleUrls: ['./cart-total-price.component.scss'],
})
export class CartTotalPriceComponent {
  @Input() totalPrice: number = 0;
}
