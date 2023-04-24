import { Component } from '@angular/core';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent {
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
}
