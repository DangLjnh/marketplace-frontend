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
  @Input() listCheckCart: any = [];
  @Input() arrAllCart: any = [];
  @Output() checkedPlus = new EventEmitter<number>();
  @Output() checkedMinus = new EventEmitter<number>();
  @Output() handleClickCounter = new EventEmitter<IProduct>();
  @Output() handleInputChange = new EventEmitter<Event>();

  toggleProductOptionCheck(event: MatCheckboxChange, cart: any): void {
    cart.checked = event.checked;
    this.cartService.cartItem = cart;
    const aaa = JSON.stringify(this.cartItems);
    if (this.listCheckCart.length == 0) {
      this.listCheckCart.push(JSON.parse(aaa));
    } else {
      this.listCheckCart.forEach((listCheckCartItem: any, index: number) => {
        const checkShopAlreadyExist = listCheckCartItem?.some(
          (item: ICartItem) => item.Shop.id === cart.Shop.id
        );
        if (checkShopAlreadyExist) {
          listCheckCartItem.forEach((item: ICartItem, index: number) => {
            if (item.id === cart.id) {
              listCheckCartItem[index] = cart;
            }
          });
        } else {
          let a = true;
          this.listCheckCart.forEach(
            (listCheck: ICartItem[], index: number) => {
              listCheck.forEach((item) => {
                if (item.Shop.id === cart.Shop.id) {
                  if (a === true) {
                    a = false;
                    this.listCheckCart.splice(index, 1);
                  }
                }
              });
            }
          );
          this.listCheckCart.push(this.cartItems);
        }
      });
    }
    this.cartService.listCheckCart = this.listCheckCart;
  }

  handleCheckAllShop() {
    const areAllChecked = this.cartItems.every(
      (product: any) => product.checked
    );
    this.cartItems.forEach(
      (product: any) => (product.checked = !areAllChecked)
    );

    const cloneCart = JSON.stringify(this.cartItems);
    if (this.arrAllCart.length === 0) {
      this.arrAllCart.push(JSON.parse(cloneCart));
    } else {
      let a = true;
      this.arrAllCart.forEach((item: ICartItem[], idx: number) => {
        const checkExistShop = item.some(
          (cart) => cart.Shop.id === this.cartItems[0].Shop.id
        );
        if (!checkExistShop && a === true) {
          a = false;
          this.arrAllCart.push(JSON.parse(cloneCart));
        }
        if (checkExistShop) {
          this.arrAllCart.splice(idx, 1);
        }
      });
    }
    this.cartService.listCheckCart = this.arrAllCart;
  }

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    console.log(this.cartItems);

    this.cartItems.forEach((product: any) => (product.checked = false));
  }
}
