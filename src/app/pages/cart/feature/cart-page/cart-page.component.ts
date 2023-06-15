import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CartService } from '../../data-access/cart.service';
import { IProduct, IResponse, IUser } from 'src/app/shared/model/interface';
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
      this.cartService.readCartDefault(userID).subscribe((data: IResponse) => {
        this.dataCarts = data.DT;
      });
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
  }
  ngOnDestroy() {
    clearInterval(this.intervalID);
  }
}
