import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-sidebar',
  templateUrl: './customer-sidebar.component.html',
  styleUrls: ['./customer-sidebar.component.scss'],
})
export class CustomerSidebarComponent {
  accountNav = [
    {
      name: 'My account',
      url: '/customer/account/edit',
      icon: 'account',
    },
    {
      name: 'Change password',
      url: '/customer/account/password',
      icon: 'lock',
    },
    {
      name: 'Addresses',
      url: '/customer/account/address',
      icon: 'location',
    },
    {
      name: 'My Purchase',
      url: '/customer/account/purchase',
      icon: 'order',
    },
  ];
}
