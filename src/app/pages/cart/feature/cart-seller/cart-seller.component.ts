import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CartService } from '../../data-access/cart.service';
import { ICartItem, IProduct } from 'src/app/shared/model/interface';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-cart-seller',
  templateUrl: './cart-seller.component.html',
  styleUrls: ['./cart-seller.component.scss'],
})
export class CartSellerComponent implements OnInit {
  @Input() cartItems!: any[];
  @Output() checkedPlus = new EventEmitter<number>();
  @Output() checkedMinus = new EventEmitter<number>();
  @Output() handleClickCounter = new EventEmitter<IProduct>();
  @Output() handleInputChange = new EventEmitter<Event>();
  listCheckCart: any[] = [];

  toggleProductOptionCheck(event: MatCheckboxChange, cart: any): void {
    cart.checked = event.checked;
    this.cartService.cartItem = cart;
    // this.cartService.listCheckCart = this.cartItems;
  }

  handleCheckAllShop() {
    const areAllChecked = this.cartItems.every(
      (product: any) => product.checked
    );
    this.cartItems.forEach(
      (product: any) => (product.checked = !areAllChecked)
    );
    this.cartService.listCheckCart = this.cartItems;
  }

  constructor(private cartService: CartService) {}
  ngOnInit(): void {}
}
