import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { ICartItem, IUser } from 'src/app/shared/model/interface';
import { CheckoutService } from '../../data-access/checkout.service';

@Component({
  selector: 'app-checkout-package',
  templateUrl: './checkout-package.component.html',
  styleUrls: ['./checkout-package.component.scss'],
})
export class CheckoutPackageComponent implements OnInit {
  @Input() dataCarts!: any;
  totalPrices!: number[];
  dataOrder!: any;
  dataUser!: IUser;

  updateTotalPrice(idx: number): number {
    const cart = this.dataCarts[idx];
    let totalPrice = 0;

    for (const item of cart) {
      if (item.checked) {
        const price = item.Product_Price_Option
          ? item.Product_Price_Option.price_discount ||
            item.Product_Price_Option.price
          : item.Product.Product_Detail.price_discount ||
            item.Product.Product_Detail.price_original;
        totalPrice += price * item.quantity;
      }
    }

    this.totalPrices[idx] = totalPrice;
    return totalPrice;
  }
  constructor(
    private authService: AuthService,
    private checkoutService: CheckoutService
  ) {}
  ngOnInit(): void {
    this.totalPrices = this.dataCarts?.map(() => 0);

    this.authService.dataUser$.subscribe((data: IUser) => {
      this.dataUser = data;
    });
    this.dataCarts = this.dataCarts?.map((carts: ICartItem[]) => {
      return carts.filter((item) => item.checked === true);
    });
    const cloneDataCarts = JSON.stringify(this.dataCarts);
    console.log(
      '🚀 ~ file: checkout-package.component.ts:49 ~ CheckoutPackageComponent ~ ngOnInit ~ this.dataCarts:',
      this.dataCarts
    );
    this.dataOrder = JSON.parse(cloneDataCarts)?.map(
      (carts: ICartItem[], index: number) => {
        let totalPriceShop = 0;
        let dataOrder = {};
        let listDataOrder: any = [];
        const dataToPersistArray = []; // Array to store dataToPersist objects

        carts.forEach((cart: ICartItem) => {
          if (!cart.Product_Price_Option) {
            if (cart.Product.Product_Detail.price_discount) {
              totalPriceShop +=
                cart.Product.Product_Detail.price_discount * cart.quantity;
            } else {
              totalPriceShop +=
                cart.Product.Product_Detail.price_original * cart.quantity;
            }
          } else {
            if (cart.Product_Price_Option.price_discount) {
              totalPriceShop +=
                cart.Product_Price_Option.price_discount * cart.quantity;
            } else {
              totalPriceShop += cart.Product_Price_Option.price * cart.quantity;
            }
          }

          dataOrder = {
            quantity: cart.quantity,
            productID: cart.Product.id,
            productPriceOptionID: cart.Product_Price_Option?.id,
            price_original:
              cart.Product_Price_Option?.price ??
              cart.Product.Product_Detail?.price_original,
            price_discount:
              cart.Product_Price_Option?.price_discount ??
              cart.Product.Product_Detail?.price_discount,
            userID: cart?.User?.id || null,
          };
          listDataOrder.push(dataOrder);
        });
        dataToPersistArray.push({
          total_price: totalPriceShop,
          payment_method: 'Thanh toán khi nhận hàng',
          note: '',
          dataOrders: JSON.stringify(listDataOrder),
          shopID: carts[0]?.Shop.id,
          userID: this.dataUser.id,
        });
        return dataToPersistArray;
      }
    );
    this.checkoutService.listDataOrder = this.dataOrder;
  }
}
