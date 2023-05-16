import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-add-image-product',
  templateUrl: './icon-add-image-product.component.html',
  styleUrls: ['./icon-add-image-product.component.scss'],
})
export class IconAddImageProductComponent {
  @Input() countImage: number = 0;
  @Output() handleChange = new EventEmitter<any>();
}
