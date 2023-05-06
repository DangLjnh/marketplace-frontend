import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-category-option',
  templateUrl: './product-category-option.component.html',
  styleUrls: ['./product-category-option.component.scss'],
})
export class ProductCategoryOptionComponent {
  @Input() nameType!: string;
  @Input() nameOptionList!: string[];
  @Input() hasType: boolean = true;
  activeOption: string = '';
  onChecked(selected: string, nameOption: string) {
    if (selected === nameOption) {
      this.activeOption = nameOption;
    } else {
      this.activeOption = '';
    }
  }
}
