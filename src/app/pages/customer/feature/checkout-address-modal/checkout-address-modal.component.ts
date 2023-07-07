import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IAddressResponse } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-checkout-address-modal',
  templateUrl: './checkout-address-modal.component.html',
  styleUrls: ['./checkout-address-modal.component.scss'],
})
export class CheckoutAddressModalComponent implements OnInit {
  listAddress!: IAddressResponse[];
  addressCurrent!: IAddressResponse;

  handleChooseAddress(address: IAddressResponse) {
    this.cartService.chooseAddress = address;
    this.dialogRef.close();
  }
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private cartService: CartService,
    public dialogRef: MatDialogRef<CheckoutAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      this.listAddress = data.Addresses;
    });
    this.cartService.chooseAddress$.subscribe((data) => {
      this.addressCurrent = data;
    });
  }
}
