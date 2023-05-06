import { Component } from '@angular/core';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss'],
})
export class ProductSectionComponent {
  activeOption: string = '';
  isActive!: boolean;
  sortBy = [
    {
      name: 'Popular',
      url: 'popular',
    },
    {
      name: 'Top sales',
      url: 'sales',
    },
    {
      name: 'Price: Low to High',
      url: 'asc',
    },
    {
      name: 'Price: High to Low',
      url: 'desc',
    },
  ];

  onChecked(selected: string, nameOption: string) {
    if (selected === nameOption) {
      this.activeOption = nameOption;
    } else {
      this.activeOption = '';
    }
  }
}
