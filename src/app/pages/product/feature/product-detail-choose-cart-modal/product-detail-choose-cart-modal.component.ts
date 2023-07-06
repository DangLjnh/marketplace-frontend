import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../data-access/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { FormBuilder, Validators } from '@angular/forms';
import { errorCode } from 'src/app/shared/model/model';

@Component({
  selector: 'app-product-detail-choose-cart-modal',
  templateUrl: './product-detail-choose-cart-modal.component.html',
  styleUrls: ['./product-detail-choose-cart-modal.component.scss'],
})
export class ProductDetailChooseCartModalComponent implements OnInit {
  isGroupCart: boolean = false;
  handleAddToCart() {
    this.cartService.createCartItem(this.data).subscribe((data) => {
      if (+data.EC === 1 || +data.EC === -1) {
        this.toastrService.error(data.EM);
      }
      if (+data.EC === 0) {
        this.toastrService.success(data.EM);
        this.dialogRef.close();
      }
    });
  }
  handleChooseGroupCart() {
    this.isGroupCart = true;
  }
  submitForm() {
    const rawDataCart = {
      cartID: this.data.cartID,
      userID: this.data.userID,
      quantity: this.data.quantity,
      name: this.cartForm.value.name,
      productID: this.data.productID,
      productPriceOptionID: this.data.productPriceOptionID,
      shopID: this.data.shopID,
    };
    this.cartService.createGroupCart(rawDataCart).subscribe((data) => {
      if (+data.EC === errorCode.SUCCESS) {
        this.toastrService.success(data.EM);
        this.dialogRef.close();
      } else {
        this.toastrService.error(data.EM);
      }
    });
  }
  cartForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
  });
  constructor(
    private readonly route: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    public dialogRef: MatDialogRef<ProductDetailChooseCartModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cartID: number;
      userID: number;
      quantity: number;
      productID: number;
      productPriceOptionID: number | null;
      shopID: number;
    },
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}
}
