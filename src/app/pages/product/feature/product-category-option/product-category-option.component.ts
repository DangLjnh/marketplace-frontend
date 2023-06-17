import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  IProductPriceOption,
  IProductType,
  TProductFilter,
} from 'src/app/shared/model/interface';

@Component({
  selector: 'app-product-category-option',
  templateUrl: './product-category-option.component.html',
  styleUrls: ['./product-category-option.component.scss'],
})
export class ProductCategoryOptionComponent implements OnInit {
  @Input() nameType!: IProductType;
  @Input() nameOptionList: (string | TProductFilter)[] | null | undefined =
    null;
  @Input() hasType: boolean = true;
  @Output() handleChooseOption = new EventEmitter<any>();
  activeOption: string = '';
  onChecked(selected: string, nameOption: string) {
    if (selected === nameOption) {
      this.activeOption = selected;
    } else {
      this.activeOption = '';
    }
  }
  getNameOptionValue(nameOption: string | TProductFilter): string | any {
    if (typeof nameOption === 'string') {
      return nameOption;
    } else {
      return nameOption.name_filter;
    }
  }
  ngOnInit(): void {}
}
