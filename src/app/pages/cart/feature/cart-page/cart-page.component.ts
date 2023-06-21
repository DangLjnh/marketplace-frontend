import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CartService } from '../../data-access/cart.service';
import {
  ICartItem,
  IProduct,
  IResponse,
  IUser,
} from 'src/app/shared/model/interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartPageComponent implements OnInit, OnDestroy {
  intervalID!: any;
  dataUser!: IUser;
  dataCarts!: any;
  productItem!: any;
  newMessage = '';
  messageList: string[] = [];
  totalPrice: number = 0;
  handleClickCartItem(product: any) {
    this.productItem = product;
  }
  handleCheckPlus(quantity: number) {
    setTimeout(() => {
      const rawData = {
        id: this.productItem.id,
        quantity: quantity + 1,
      };
      this.cartService
        .updateQuantityCartItem(rawData)
        .subscribe((dataUpdateCart: IResponse) => {
          if (+dataUpdateCart.EC === 1) {
            this.toastService.error(dataUpdateCart.EM);
          }
          this.cartService
            .readCartDefault(this.dataUser.id)
            .subscribe((data: IResponse) => {
              this.dataCarts = data.DT;
            });
        });
    }, 1);
  }
  handleCheckMinus(quantity: number) {
    setTimeout(() => {
      if (quantity === 0) {
        quantity = 1;
      }
      const rawData = {
        id: this.productItem.id,
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
        id: this.productItem.id,
        quantity: input.value,
      };
      this.cartService
        .updateQuantityCartItem(rawData)
        .subscribe((dataUpdateCart) => {
          if (+dataUpdateCart.EC === 1) {
            this.toastService.error(dataUpdateCart.EM);
            input.value = this.productItem.Product.Stock.quantity;
          }
          if (+dataUpdateCart.EC === 0) {
            this.handleUpdateCart(this.dataUser.id);
          }
        });
    }, 1);
  }
  handleUpdateCart(userID: number) {
    this.cartService.readCartDefault(userID).subscribe((data: IResponse) => {
      this.dataCarts = data.DT;

      // Set the interval to execute the function every 5 seconds
      // this.cartService.readCartDefault(userID).subscribe((data: IResponse) => {
      //   this.dataCarts = data.DT;
      // });
      // this.intervalID = setInterval(() => {

      // }, 5000);
    });
  }

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private toastService: ToastrService
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data: IUser) => {
      this.dataUser = data;
      this.handleUpdateCart(data?.id);
    });
    this.cartService.cartItem$.subscribe((data) => {
      const price =
        data?.Product_Price_Option?.price_discount ||
        data?.Product_Price_Option?.price ||
        data?.Product?.Product_Detail?.price_discount ||
        data?.Product?.Product_Detail?.price_original;
      // const currentChoose = JSON.stringify(item) === JSON.stringify(data);
      if (data?.checked === true) {
        this.totalPrice += price * data?.quantity;
      }
      if (data?.checked !== null && data?.checked === false) {
        this.totalPrice -= price * data?.quantity;
      }
    });
    this.cartService.listCheckCart$.subscribe((cartItems) => {
      if (cartItems.length > 0) {
        if (cartItems[0].checked === true) {
          this.totalPrice = 0;
        }

        cartItems.forEach((item: any) => {
          const price =
            item.Product_Price_Option?.price_discount ||
            item.Product_Price_Option?.price ||
            item.Product?.Product_Detail?.price_discount ||
            item.Product?.Product_Detail?.price_original;
          if (item?.checked === true) {
            this.totalPrice += price * item?.quantity;
          }
          if (item?.checked === false) {
            this.totalPrice -= price * item?.quantity;
          }
        });
      }
    });
  }
  ngOnDestroy() {
    clearInterval(this.intervalID);
  }
}
