import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-free-ship',
  templateUrl: './cart-free-ship.component.html',
  styleUrls: ['./cart-free-ship.component.scss'],
})
export class CartFreeShipComponent implements OnInit {
  @Input() totalPrice: number = 0;
  percentShip: number = 0;
  ngOnInit(): void {
    if (this.totalPrice < 299000) {
      this.percentShip = (this.totalPrice * 100) / 300;
    } else {
      this.percentShip = (300 * 100) / 300;
    }
  }
}
