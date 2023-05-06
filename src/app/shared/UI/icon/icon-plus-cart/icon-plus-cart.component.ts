import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-plus-cart',
  templateUrl: './icon-plus-cart.component.html',
  styleUrls: ['./icon-plus-cart.component.scss'],
})
export class IconPlusCartComponent {
  @Input() color!: string;
  @Input() stroke: string = 'black';
}
