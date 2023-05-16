import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-product-row',
  templateUrl: './form-product-row.component.html',
  styleUrls: ['./form-product-row.component.scss'],
})
export class FormProductRowComponent {
  @Input() title!: string;
}
