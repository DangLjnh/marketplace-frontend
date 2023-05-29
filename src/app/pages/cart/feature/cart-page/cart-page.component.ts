import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CartService } from '../../data-access/cart.service';
import { IResponse, IUser } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartPageComponent implements OnInit {
  dataUser!: IUser;
  dataCarts!: any;
  cartItemID!: number;
  newMessage = '';
  messageList: string[] = [];
  handleClickCartItem(cartItemID: number) {
    this.cartItemID = cartItemID;
  }
  handleCheckPlus(quantity: number) {
    setTimeout(() => {
      const rawData = {
        id: this.cartItemID,
        quantity: quantity + 1,
      };
      this.cartService.updateQuantityCartItem(rawData).subscribe((data) => {
        this.handleUpdateCart(this.dataUser.id);
      });
    }, 1);
  }
  handleCheckMinus(quantity: number) {
    setTimeout(() => {
      if (quantity === 0) {
        quantity = 1;
      }
      const rawData = {
        id: this.cartItemID,
        quantity: quantity === 1 ? 1 : quantity - 1,
      };
      this.cartService.updateQuantityCartItem(rawData).subscribe((data) => {
        this.cartService
          .readCartDefault(this.dataUser.id)
          .subscribe((data: IResponse) => {
            this.dataCarts = data.DT;
          });
      });
    }, 1);
  }
  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    setTimeout(() => {
      const rawData = {
        id: this.cartItemID,
        quantity: input.value,
      };
      this.cartService.updateQuantityCartItem(rawData).subscribe(() => {
        this.handleUpdateCart(this.dataUser.id);
      });
    }, 1);
  }
  handleUpdateCart(userID: number) {
    this.cartService.readCartDefault(userID).subscribe((data: IResponse) => {
      this.dataCarts = data.DT;
    });
  }
  sendMessage() {
    this.cartService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data: IUser) => {
      this.dataUser = data;
      this.handleUpdateCart(data.id);
    });
    this.cartService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }
}
