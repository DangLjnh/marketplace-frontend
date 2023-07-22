import { filter, map, pluck, switchMap } from 'rxjs';
import {
  Component,
  ElementRef,
  OnInit,
  AfterViewChecked,
  ViewChild,
  QueryList,
  ViewChildren,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { CategoryService } from 'src/app/pages/category/data-access/category.service';
import { ICategory } from 'src/app/shared/model/interface';
import { errorCode } from 'src/app/shared/model/model';
import { toBase64 } from 'src/app/shared/utils/function';

@Component({
  selector: 'app-admin-category-create-edit',
  templateUrl: './admin-category-create-edit.component.html',
  styleUrls: ['./admin-category-create-edit.component.scss'],
})
export class AdminCategoryCreateEditComponent
  implements OnInit, AfterViewChecked
{
  base64Image!: string;
  fileImage!: File;
  dataCategory!: ICategory;
  categoryFilterOption: any = [-1];
  @ViewChildren('category_filter') categoryFilter!: QueryList<any>;
  valueCategoryOption: any[] = [];
  addSecondOption(i: number) {
    this.categoryFilterOption.push(i);
  }

  deleteSecondOption(i: number) {
    if (i > 0) {
      this.categoryFilterOption = this.categoryFilterOption.filter(
        (item: any, index: number) => index !== i
      );
    }
  }
  async handleChangeFile(e: any) {
    if (e.target && e.target.files[0]) {
      let strToReplace = await toBase64(e.target.files[0]);
      this.base64Image = String(strToReplace)?.replace(
        /^data:image\/[a-z]+;base64/,
        ''
      );
      this.fileImage = e.target.files[0];
    }
  }
  handleChangeInput() {}
  categoryForm = this.fb.group({
    name_category: [''],
  });
  submitForm() {
    const formData = new FormData();
    this.valueCategoryOption = this.categoryFilter
      .toArray()
      .map((input) => input.nativeElement.value)
      .filter((item) => item !== '');
    const rawData = {
      id: this?.dataCategory?.id,
      name_category: this.categoryForm.value.name_category,
      dataCategoryFilter: JSON.stringify(this.valueCategoryOption),
    };
    formData.append('file', this.fileImage);
    formData.append('data', JSON.stringify(rawData));
    if (this?.dataCategory) {
      // this.categoryService.updateCategory(rawData).subscribe((data) => {
      //   if (+data.EC == errorCode.SUCCESS) {
      //     this.toastrService.success(data.EM);
      //   } else {
      //     this.toastrService.error(data.EM);
      //   }
      // });
    } else {
      this.categoryService.createCategory(formData).subscribe((data) => {
        if (+data.EC == errorCode.SUCCESS) {
          this.toastrService.success(data.EM);
        } else {
          this.toastrService.error(data.EM);
        }
      });
    }
  }
  showDataUpdate() {
    const listCategory = this?.dataCategory?.Category_Filters;
    if (listCategory?.length > 0) {
      const categoryFilterList = document.querySelectorAll(
        '.category_filter'
      ) as NodeListOf<HTMLInputElement>;
      categoryFilterList?.forEach((item, index) => {
        item.value = String(listCategory[index]?.name_category_filter);
      });
    }
  }
  getDataServer() {}
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private readonly route: ActivatedRoute,
    private categoryService: CategoryService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}
  ngAfterViewChecked(): void {
    this.showDataUpdate();
    this.changeDetectorRef.detectChanges();
  }
  ngOnInit() {
    this.route.params
      .pipe(
        pluck('id'),
        switchMap((id) => this.categoryService.readSingleCategory(id)),
        filter((category) => !!category),
        map((data) => data.DT)
      )
      .subscribe((data) => {
        if (data) {
          this.categoryForm.patchValue({
            name_category: data?.name_category,
          });
          this.dataCategory = data;
          if (
            this.categoryFilterOption &&
            this?.categoryFilterOption?.length > 0
          ) {
            this.categoryFilterOption = data?.Category_Filters;
          }
        }
      });
  }
}
