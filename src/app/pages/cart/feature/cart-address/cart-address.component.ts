import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CheckoutAddressModalComponent } from 'src/app/pages/customer/feature/checkout-address-modal/checkout-address-modal.component';
import {
  IAddress,
  IAddressResponse,
  IUser,
} from 'src/app/shared/model/interface';
import { CartService } from '../../data-access/cart.service';

@Component({
  selector: 'app-cart-address',
  templateUrl: './cart-address.component.html',
  styleUrls: ['./cart-address.component.scss'],
})
export class CartAddressComponent implements OnInit {
  dataUser!: IUser;
  addressDefault!: IAddressResponse;
  openModalChangeAddress() {
    this.dialog.open(CheckoutAddressModalComponent);
  }
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      this.dataUser = data;
      if (this.dataUser.Addresses.length > 0) {
        this.dataUser.Addresses.forEach((item) => {
          if (item.isDefault === true) {
            this.cartService.chooseAddress = item;
          }
        });
      }
    });
    this.cartService.chooseAddress$.subscribe((data) => {
      this.addressDefault = data;
    });
  }
}
