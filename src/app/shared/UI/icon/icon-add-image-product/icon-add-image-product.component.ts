import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IImageProducts } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-icon-add-image-product',
  templateUrl: './icon-add-image-product.component.html',
  styleUrls: ['./icon-add-image-product.component.scss'],
})
export class IconAddImageProductComponent {
  @Input() countImage: number = 0;
  @Input() listBase64!: any[];
  @Input() listImages!: IImageProducts[];
  @Output() handleChange = new EventEmitter<any>();
  @Output() handleDeleteImage = new EventEmitter<any>();
  @Output() handleFocus = new EventEmitter<string>();
}
