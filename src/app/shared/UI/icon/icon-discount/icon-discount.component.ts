import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-discount',
  templateUrl: './icon-discount.component.html',
  styleUrls: ['./icon-discount.component.scss'],
})
export class IconDiscountComponent {
  @Input() percent!: string | null | undefined;
}
