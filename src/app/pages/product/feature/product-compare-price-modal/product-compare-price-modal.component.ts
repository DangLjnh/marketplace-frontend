import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../data-access/product.service';

@Component({
  selector: 'app-product-compare-price-modal',
  templateUrl: './product-compare-price-modal.component.html',
  styleUrls: ['./product-compare-price-modal.component.scss'],
})
export class ProductComparePriceModalComponent implements OnInit {
  listComparePrice!: any[];
  handleOpenTab(link: string) {
    window.open(link, '_blank');
  }
  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductComparePriceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    const data = this.data;
    this.productService
      .searchSameProduct({ name: data.name })
      .subscribe((data) => {
        this.listComparePrice = data.DT;
        this.listComparePrice.forEach((item) => {
          if (
            item.current_seller_logo &&
            !item.current_seller_logo.startsWith('https://')
          ) {
            const data =
              'https://vcdn.tikicdn.com/cache/w100/ts/seller/' +
              item.current_seller_logo;
            item.current_seller_logo = data;
          }
        });
      });
  }
}
