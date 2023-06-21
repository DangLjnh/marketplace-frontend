import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../data-access/product.service';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IProduct } from 'src/app/shared/model/interface';
import { map } from 'rxjs';
import { statusProduct } from 'src/app/shared/model/model';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-seller-discount-product-modal',
  templateUrl: './seller-discount-product-modal.component.html',
  styleUrls: ['./seller-discount-product-modal.component.scss'],
})
export class SellerDiscountProductModalComponent implements OnInit {
  productList!: any[];
  productOptionList: any[] = [];
  hasOption: boolean = true;
  onSubmit(e: Event): void {
    e.preventDefault();
    this.productService.listCheckProduct = this.productList;
    this.productService.listCheckProductOption = this.productOptionList;
    this.dialogRef.close();
  }
  toggleProductCheck(event: MatCheckboxChange, product: IProduct): void {
    product.checked = event.checked;
  }
  toggleProductOptionCheck(event: MatCheckboxChange, product: IProduct): void {
    product.checked = event.checked;
  }
  handleCheckAll() {
    const areAllChecked = this.productList.every((product) => product.checked);
    const areAllCheckedOption = this.productOptionList.every(
      (product) => product.checked
    );
    this.productList.forEach((product) => (product.checked = !areAllChecked));
    this.productList = this.productList.filter(
      (item) => item.Product_Price_Options.length === 0
    );
    this.productOptionList.forEach(
      (product) => (product.checked = !areAllCheckedOption)
    );
  }
  constructor(
    public dialogRef: MatDialogRef<SellerDiscountProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      if (this.data.type === 'create') {
        this.productService
          .readAllProductOfShop(data.Shop.id)
          .pipe(
            map((data) =>
              data.DT.filter(
                (data: IProduct) => data.status === statusProduct.ACTIVE
              )
            )
          )
          .subscribe((data) => {
            this.productList = data;
            this.productList.forEach((product) => (product.checked = false));
            this.productList.forEach((item) => {
              item.Product_Price_Options.forEach((option: any) => {
                const formatData = {
                  Product_Price_Options: option,
                  Image_Products: item.Image_Products,
                  Product_Detail: item.Product_Detail,
                };
                this.productOptionList.push(formatData);
              });
            });
          });
      }
      if (this.data.type === 'edit') {
        this.productService.listCheckProduct$.subscribe((data) => {
          this.productList = data;
        });
        this.productService.listCheckProductOption$.subscribe((data) => {
          this.productOptionList = data;
        });
      }
    });
  }
}
