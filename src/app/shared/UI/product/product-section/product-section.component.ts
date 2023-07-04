import { Observable } from 'rxjs';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CategoryService } from 'src/app/pages/category/data-access/category.service';
import { ICategoryFilter, IProduct } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss'],
})
export class ProductSectionComponent implements OnInit, AfterViewInit {
  @Input() listCategoryFilter$!: Observable<ICategoryFilter[]>;
  listCategoryFilter!: ICategoryFilter[];
  listProduct!: IProduct[];
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

  handleChooseCategory(categoryFilterID: number): void {
    this.listCategoryFilter.forEach((category) => {
      category.isChoose = category.id === categoryFilterID;
    });
    this.categoryService
      .readAllProductByCategoryFilter(categoryFilterID)
      .subscribe((data) => {
        this.listProduct = data.DT;
      });
  }

  onChecked(selected: string, nameOption: string) {
    if (selected === nameOption) {
      this.activeOption = nameOption;
    } else {
      this.activeOption = '';
    }
  }
  setFirstCategoryChoose(): void {
    if (this.listCategoryFilter.length > 0) {
      this.listCategoryFilter.forEach((item, index) => {
        if (index === 0) {
          item.isChoose = true;
        } else {
          item.isChoose = false;
        }
      });
    }
  }
  constructor(private categoryService: CategoryService) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.listCategoryFilter$.subscribe((data) => {
      this.listCategoryFilter = data;
      this.setFirstCategoryChoose();
      this.categoryService
        .readAllProductByCategoryFilter(data[0].id)
        .subscribe((data) => {
          this.listProduct = data.DT;
        });
    });
  }
}
