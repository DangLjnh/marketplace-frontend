import { pluck, switchMap, filter, map } from 'rxjs';
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
import { ActivatedRoute } from '@angular/router';

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
  arrAllCart: any = [];
  listCheckCart: any = [];
  cartID!: string | null;
  handleClickCartItem(product: any) {
    this.productItem = product;
  }
  handleCheckPlus(quantity: number) {
    setTimeout(() => {
      const rawData = {
        id: this.productItem.id,
        quantity: quantity + 1,
      };
      if (this.productItem.Product_Price_Option) {
        this.cartService
          .updateQuantityCartItemOption(rawData)
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
      } else {
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
      }
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
      if (this.productItem.Product_Price_Option) {
        this.cartService
          .updateQuantityCartItemOption(rawData)
          .subscribe((data) => {
            this.cartService
              .readCartDefault(this.dataUser.id)
              .subscribe((data: IResponse) => {
                this.dataCarts = data.DT;
              });
          });
      } else {
        this.cartService.updateQuantityCartItem(rawData).subscribe((data) => {
          this.cartService
            .readCartDefault(this.dataUser.id)
            .subscribe((data: IResponse) => {
              this.dataCarts = data.DT;
            });
        });
      }
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
    if (!this.cartID) {
      this.cartService.readCartDefault(userID).subscribe((data: IResponse) => {
        this.dataCarts = data.DT;
        // Set the interval to execute the function every 5 seconds
        // this.cartService.readCartDefault(userID).subscribe((data: IResponse) => {
        //   this.dataCarts = data.DT;
        // });
        // this.intervalID = setInterval(() => {

        // }, 5000);
      });
    } else {
      this.cartService
        .readAllItemOfGroupCart(Number(this.cartID))
        .subscribe((data) => {
          this.dataCarts = data.DT;
        });
    }
  }

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.cartID = this.route.snapshot.paramMap.get('cartID');
    // this.listCategoryFilter$ =
    // this.cartService
    //   .readAllItemOfGroupCart(Number(this.cartID))
    //   .subscribe((data) => {
    //     console.log(
    //       '🚀 ~ file: cart-page.component.ts:156 ~ CartPageComponent ~ .subscribe ~ data:',
    //       data
    //     );
    //   });
    // if (this.cartID) {
    // } else {
    // }
    this.cartService.listCheckCart$.subscribe((cartItems) => {
      this.totalPrice = 0;
      cartItems.forEach((carts: ICartItem[]) => {
        carts.forEach((item: ICartItem) => {
          const price =
            item.Product_Price_Option?.price_discount ||
            item.Product_Price_Option?.price ||
            item.Product?.Product_Detail?.price_discount ||
            item.Product?.Product_Detail?.price_original;
          if (item.checked === true) {
            this.totalPrice += price * item.quantity;
            this.cartService.totalPrice = this.totalPrice;
          }
        });
      });
    });
    this.authService.dataUser$.subscribe((data: IUser) => {
      this.dataUser = data;
      this.handleUpdateCart(data?.id);
    });
  }
  ngOnDestroy() {
    clearInterval(this.intervalID);
  }
}
