import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-seller',
  templateUrl: './cart-seller.component.html',
  styleUrls: ['./cart-seller.component.scss'],
})
export class CartSellerComponent {
  @Input() cartItems!: any;
}
