import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/pages/category/data-access/category.service';
import { ICategory } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  categoryList!: ICategory[];
  constructor(
    private categoryService: CategoryService,
    private toastService: ToastrService
  ) {}
  ngOnInit(): void {
    this.categoryService.readAllCategory().subscribe((data) => {
      console.log(
        '🚀 ~ file: admin-category.component.ts:19 ~ AdminCategoryComponent ~ this.categoryService.readAllCategory ~ data:',
        data
      );
      this.categoryList = data.DT;
    });
  }
}
