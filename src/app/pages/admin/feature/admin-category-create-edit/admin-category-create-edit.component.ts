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
export class AdminCategoryCreateEditComponent implements OnInit {
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
  handleChangeInput(e: any) {}
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
    if (this?.dataCategory) {
      const categoryFilterList = document.querySelectorAll(
        '.category_filter'
      ) as NodeListOf<HTMLInputElement>;
      const value: any = [];
      categoryFilterList?.forEach((item, index) => {
        const dataIndex = item.getAttribute('data-index');
        const data = {
          name: this.valueCategoryOption[index],
          id: dataIndex,
        };
        value.push(data);
      });
      rawData.dataCategoryFilter = value;
      formData.append('data', JSON.stringify(rawData));
      this.categoryService.updateCategory(formData).subscribe((data) => {
        if (+data.EC == errorCode.SUCCESS) {
          this.toastrService.success(data.EM);
        } else {
          this.toastrService.error(data.EM);
        }
      });
    } else {
      formData.append('data', JSON.stringify(rawData));
      this.categoryService.createCategory(formData).subscribe((data) => {
        if (+data.EC == errorCode.SUCCESS) {
          this.toastrService.success(data.EM);
        } else {
          this.toastrService.error(data.EM);
        }
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
  // ngAfterViewChecked(): void {

  //   this.changeDetectorRef.detectChanges();
  // }
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
          console.log(
            '🚀 ~ file: admin-category-create-edit.component.ts:129 ~ AdminCategoryCreateEditComponent ~ .subscribe ~ data:',
            data
          );
          this.categoryForm.patchValue({
            name_category: data?.name_category,
          });
          this.dataCategory = data;
          if (data?.Category_Filters?.length > 0)
            this.categoryFilterOption = data?.Category_Filters;
          console.log(
            '🚀 ~ file: admin-category-create-edit.component.ts:135 ~ AdminCategoryCreateEditComponent ~ .subscribe ~ this.categoryFilterOption:',
            this.categoryFilterOption
          );
        }
      });
  }
}
