import { pluck, switchMap, filter, take, Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../data-access/category.service';
import { ActivatedRoute } from '@angular/router';
import { ICategoryFilter } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  listCategoryFilter$!: Observable<ICategoryFilter[]>;
  constructor(
    private categoryService: CategoryService,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.listCategoryFilter$ = this.route.params.pipe(
      pluck('slug'),
      switchMap((id) =>
        this.categoryService.readAllCategoryFilterOfCategory(id)
      ),
      filter((product) => !!product),
      map((product) => product.DT)
    );
  }
}
