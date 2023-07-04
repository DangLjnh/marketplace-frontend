import { Component } from '@angular/core';

@Component({
  selector: 'app-home-flash-sale',
  templateUrl: './home-flash-sale.component.html',
  styleUrls: ['./home-flash-sale.component.scss'],
})
export class HomeFlashSaleComponent {
  arr = [
    {
      percent: 42,
      price: 89000,
      percent_sold: Math.floor(Math.random() * 100) + 1,
      url: 'https://salt.tikicdn.com/cache/w1200/ts/product/83/30/87/737846efdb9f28f0f51352cacf9225c5.jpg',
    },
  ];
}
