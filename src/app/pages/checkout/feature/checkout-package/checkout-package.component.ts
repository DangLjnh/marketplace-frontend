import { Component, OnInit, Input } from '@angular/core';
import { ICartItem } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-checkout-package',
  templateUrl: './checkout-package.component.html',
  styleUrls: ['./checkout-package.component.scss'],
})
export class CheckoutPackageComponent implements OnInit {
  @Input() dataCarts!: any;
  totalPrices!: number[];
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

  ngOnInit(): void {
    this.totalPrices = this.dataCarts.map(() => 0);
  }
}
