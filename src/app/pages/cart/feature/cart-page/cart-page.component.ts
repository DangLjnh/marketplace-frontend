import { Component, ViewEncapsulation } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartPageComponent {
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;
}
