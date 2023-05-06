import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-purchase',
  templateUrl: './customer-purchase.component.html',
  styleUrls: ['./customer-purchase.component.scss'],
})
export class CustomerPurchaseComponent {
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
}
