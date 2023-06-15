import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CategoryService } from '../../../data-access/category/category.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-product-category-modal',
  templateUrl: './seller-product-category-modal.component.html',
  styleUrls: ['./seller-product-category-modal.component.scss'],
})
export class SellerProductCategoryModalComponent implements OnInit {
  categories: any[] = [];
  categoriesFilter: any[] = [];
  categoryFilterID!: number;
  handleChooseCategory(categoryID: number) {
    this.categoryService
      .readAllCategoryFilterByCategory(categoryID)
      .subscribe((data) => {
        this.categoriesFilter = data.DT;
      });
    return this.categoryService.readAllCategoryFilterByCategory(categoryID);
  }
  handleChooseCategoryFilter(categoryFilterID: number) {
    this.categoryFilterID = categoryFilterID;
  }
  categoryProductForm = this.fb.group({
    category: [''],
    category_filter: [''],
  });
  submitForm() {
    this.categoryService.categoryFilter = this.categoryFilterID;
    this.dialogRef.close();
  }
  constructor(
    public dialogRef: MatDialogRef<SellerProductCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.categoryService.readAllCategory().subscribe((data) => {
      this.categories = data.DT;
    });
    if (this.data.type == 'edit') {
      this.categoryService.categoryFilter$.subscribe((categoryFilterID) => {
        this.categoryService
          .readSingleCategoryFilter(categoryFilterID)
          .subscribe((data) => {
            if (data) {
              this.categoryProductForm.patchValue({
                category: data.DT.Category.name_category,
              });
              this.handleChooseCategory(data.DT.categoryID).subscribe(
                (dataS) => {
                  this.categoriesFilter = dataS.DT;
                  this.categoryProductForm
                    .get('category_filter')
                    ?.setValue(data.DT.name_category_filter);
                }
              );
            }
          });
      });
    }
  }
}
