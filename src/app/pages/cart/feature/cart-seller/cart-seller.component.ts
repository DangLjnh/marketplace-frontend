import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../data-access/cart.service';

@Component({
  selector: 'app-cart-seller',
  templateUrl: './cart-seller.component.html',
  styleUrls: ['./cart-seller.component.scss'],
})
export class CartSellerComponent {
  @Input() cartItems!: any;
  @Output() checkedPlus = new EventEmitter<number>();
  @Output() checkedMinus = new EventEmitter<number>();
  @Output() handleClickCounter = new EventEmitter<number>();
  @Output() handleInputChange = new EventEmitter<Event>();

  constructor(private cartService: CartService) {}
}
