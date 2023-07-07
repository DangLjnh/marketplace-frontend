import { Observable } from 'rxjs';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CategoryService } from 'src/app/pages/category/data-access/category.service';
import { ICategoryFilter, IProduct } from 'src/app/shared/model/interface';
import { ShopService } from 'src/app/pages/shop/data-access/shop.service';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss'],
})
export class ProductSectionComponent implements OnInit, AfterViewInit {
  @Input() listCategoryFilter$!: Observable<ICategoryFilter[]>;
  @Input() shopID!: number | undefined;
  listCategoryFilter!: ICategoryFilter[];
  listCategory!: any[];
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
    if (!this.shopID) {
      this.categoryService
        .readAllProductByCategoryFilter(categoryFilterID)
        .subscribe((data) => {
          this.listProduct = data.DT;
        });
    }
    if (this.shopID) {
      const rawData = {
        shopID: this.shopID,
        categoryFilterID,
      };
      this.shopService
        .readAllProductByCategoryFilterOfShop(rawData)
        .subscribe((data) => {
          this.listProduct = data.DT[0];
        });
    }
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
  constructor(
    private categoryService: CategoryService,
    private shopService: ShopService
  ) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.listCategoryFilter$.subscribe((data) => {
      this.listCategoryFilter = data;
      let listClone: ICategoryFilter[] = [];
      this.listCategoryFilter.forEach((item) => {
        const checkExist = listClone.some(
          (category) =>
            category.name_category_filter === item.name_category_filter
        );
        if (!checkExist) {
          listClone.push(item);
        }
      });
      this.listCategoryFilter = listClone;

      this.setFirstCategoryChoose();
      if (!this.shopID) {
        this.categoryService
          .readAllProductByCategoryFilter(data[0].id)
          .subscribe((data) => {
            this.listProduct = data.DT;
          });
      } else {
        const rawData = {
          shopID: this.shopID,
          categoryFilterID: data[0].id,
        };
        this.shopService
          .readAllProductByCategoryFilterOfShop(rawData)
          .subscribe((data) => {
            this.listProduct = data.DT[0];
          });
      }
    });
  }
}
