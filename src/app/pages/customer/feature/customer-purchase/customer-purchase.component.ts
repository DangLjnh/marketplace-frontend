import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CheckoutService } from 'src/app/pages/checkout/data-access/checkout.service';
import { IUser } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-customer-purchase',
  templateUrl: './customer-purchase.component.html',
  styleUrls: ['./customer-purchase.component.scss'],
})
export class CustomerPurchaseComponent {
  dataOrders!: any;
  dataUser!: IUser;
  purchases = [
    {
      name: 'All',
      url: '',
    },
    {
      name: 'To Receive',
      url: '',
    },
    {
      name: 'Completed',
      url: '',
    },
    {
      name: 'Cancelled',
      url: '',
    },
  ];

  constructor(
    private checkoutService: CheckoutService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.dataUser$.subscribe((data: IUser) => {
      this.dataUser = data;
    });
    this.checkoutService
      .readAllOrderOfUser(this.dataUser.id)
      .subscribe((data) => {
        console.log(
          '🚀 ~ file: customer-purchase.component.ts:47 ~ CustomerPurchaseComponent ~ .subscribe ~ data:',
          data.DT
        );
        this.dataOrders = data.DT;
      });
  }
}
