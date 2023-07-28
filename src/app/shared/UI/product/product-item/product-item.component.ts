import { Component, Input } from '@angular/core';
import { IProduct, IProductPriceOption } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() productItem!: IProduct;
  getDiscountHigh(listProductOption: IProductPriceOption[]) {
    let discountHigh = 0;
    listProductOption.forEach((item) => {
      const itemDiscount = item?.Discount_Percent?.percent
        ? item?.Discount_Percent?.percent
        : 0;
      if (+itemDiscount > discountHigh) {
        discountHigh = +itemDiscount; // Update discountHigh only if the current item's price is lower
      }
    });
    return discountHigh;
  }
  getLowPrice(listProductOption: IProductPriceOption[]) {
    let priceLow = Infinity;
    listProductOption.forEach((item) => {
      const itemPrice = item.price_discount ? item.price_discount : item.price;
      if (itemPrice < priceLow) {
        priceLow = itemPrice; // Update priceLow only if the current item's price is lower
      }
    });
    return priceLow;
  }
}
