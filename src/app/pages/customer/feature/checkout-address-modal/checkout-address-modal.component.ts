import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IAddressResponse } from 'src/app/shared/model/interface';
import { CustomerAddressModalComponent } from '../customer-address-modal/customer-address-modal.component';
import { CustomerService } from '../../data-access/customer.service';

@Component({
  selector: 'app-checkout-address-modal',
  templateUrl: './checkout-address-modal.component.html',
  styleUrls: ['./checkout-address-modal.component.scss'],
})
export class CheckoutAddressModalComponent implements OnInit {
  listAddress!: IAddressResponse[];
  addressCurrent!: IAddressResponse;

  openModalCreateAddress() {
    this.dialog.open(CustomerAddressModalComponent, {
      data: {
        type: 'create',
      },
    });
  }

  handleChooseAddress(address: IAddressResponse) {
    this.cartService.chooseAddress = address;
    this.dialogRef.close();
  }
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<CheckoutAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      this.customerService.listAddress = data.Addresses;
      this.customerService.listAddress$.subscribe((data) => {
        this.listAddress = data;
      });
    });
    this.cartService.chooseAddress$.subscribe((data) => {
      this.addressCurrent = data;
    });
  }
}
