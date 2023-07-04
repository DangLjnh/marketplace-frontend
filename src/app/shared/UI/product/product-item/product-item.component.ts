import { Component, Input } from '@angular/core';
import { IProduct, IProductPriceOption } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() productItem!: IProduct;
  getLowPrice(listProductOption: IProductPriceOption[]) {
    let priceLow = 0;
    listProductOption.forEach((item, index) => {
      if (index == 0) {
        priceLow = item.price_discount ? item.price_discount : item.price;
      } else {
        priceLow = item.price_discount ? item.price_discount : item.price;
      }
    });
    return priceLow;
  }
}
