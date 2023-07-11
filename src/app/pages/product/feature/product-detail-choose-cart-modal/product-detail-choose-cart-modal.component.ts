import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { FormBuilder, Validators } from '@angular/forms';
import { errorCode } from 'src/app/shared/model/model';
import { Observable, filter, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';

@Component({
  selector: 'app-product-detail-choose-cart-modal',
  templateUrl: './product-detail-choose-cart-modal.component.html',
  styleUrls: ['./product-detail-choose-cart-modal.component.scss'],
})
export class ProductDetailChooseCartModalComponent implements OnInit {
  isGroupCart: boolean = false;
  isChooseAddCart: boolean = false;
  listGroupCart$!: Observable<any[]>;
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
  handleChooseCart(cartID: number) {
    const rawDataCart = {
      cartID: cartID,
      userID: this.data.userID,
      quantity: this.data.quantity,
      productID: this.data.productID,
      productPriceOptionID: this.data.productPriceOptionID,
      shopID: this.data.shopID,
    };
    this.cartService.addItemToGroupCart(rawDataCart).subscribe((data) => {
      if (+data.EC === 0) {
        this.toastrService.success(data.EM);
      } else {
        this.toastrService.error(data.EM);
      }
    });
    this.dialogRef.close();
  }
  handleChooseGroupCart() {
    this.listGroupCart$.subscribe((data) => {
      if (data.length > 0) {
        this.isGroupCart = true;
      } else {
        this.isGroupCart = true;
        this.isChooseAddCart = true;
      }
    });
  }
  handleChooseAddCart() {
    this.isChooseAddCart = true;
  }
  returnChooseCart() {
    this.isGroupCart = false;
  }
  returnAddCart() {
    this.listGroupCart$.subscribe((data) => {
      if (data.length > 0) {
        this.isGroupCart = false;
      } else {
        this.isGroupCart = false;
        this.isChooseAddCart = false;
      }
    });
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
    private authService: AuthService,
    private router: Router,
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
  ngOnInit(): void {
    this.listGroupCart$ = this.authService.dataUser$.pipe(
      switchMap((data) => this.cartService.readAllGroupCartOfUser(data?.id)),
      filter((cart) => !!cart),
      map((cart) => cart.DT)
    );
  }
}
