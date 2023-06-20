import { filter, of, pluck, switchMap, tap } from 'rxjs';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  FormArray,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import {
  IImageProducts,
  IProduct,
  IUser,
} from 'src/app/shared/model/interface';
import { toBase64 } from 'src/app/shared/utils/function';
import { ProductService } from '../../../data-access/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerProductCategoryModalComponent } from '../seller-product-category-modal/seller-product-category-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../data-access/category/category.service';

interface PriceInfo {
  stock: number;
  option: string;
  price: number;
}

interface OptionInfo {
  option: string;
  prices?: PriceInfo[];
}

interface ProductType {
  name_product_type: string;
  options: OptionInfo[];
}

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.scss'],
})
export class SellerProductComponent implements OnInit {
  @ViewChild('formContainer') formContainer!: ElementRef;
  @ViewChildren('first_option') firstOptionControls!: QueryList<any>;
  @ViewChildren('second_option') secondOptionControls!: QueryList<any>;
  @ViewChildren('option_price') optionPrice!: QueryList<any>;
  @ViewChildren('option_stock') optionStock!: QueryList<any>;
  fileInputRef!: ElementRef<HTMLInputElement>;
  nameCategory!: string;
  nameCategoryFilter!: string;
  categoryFilterID!: number;
  listFile: any[] = []; // when add file
  listBase64: any[] = []; // when add file
  listImage: IImageProducts[] = []; // list image get from api
  dataUser!: IUser;
  valueCounter!: number;
  loading: boolean = false;
  focusInput!: string;
  isEdit: boolean = false;
  countImage: number = 0;
  productID!: number;
  isChooseOption: boolean = false;
  isChooseSecondOption: boolean = false;
  formControlFirstOptions: number[] = [-1];
  formControlSecondOptions: number[] = [-1];
  totalOptions: any[] = [];
  resultType: string[] = [];
  valueOptionPrice: string[] = [];
  valueOptionStock: string[] = [];
  valueFirstOption: any[] = [];
  valueSecondOption: any[] = [];

  list = [
    {
      name: 'Thông tin cơ bản',
      section: 'section1',
    },
    {
      name: 'Thông tin chi tiết',
      section: 'section2',
    },
    {
      name: 'Thông tin bán hàng',
      section: 'section3',
    },
    {
      name: 'Vận chuyển',
      section: 'section4',
    },
  ];
  handleChangeInput() {
    this.valueFirstOption = this.firstOptionControls
      .toArray()
      .map((input) => input.nativeElement.value);
    this.valueSecondOption = this.secondOptionControls
      .toArray()
      .map((input) => input.nativeElement.value);
    const result: any[] = [];

    if (this.valueSecondOption.length > 0) {
      this.valueFirstOption.forEach((option1) => {
        this.valueSecondOption.forEach((option2) => {
          result.push({
            firstOption: option1.toLowerCase(),
            secondOption: option2,
          });
        });
      });
    } else {
      this.valueFirstOption.forEach((option1) => {
        result.push({
          firstOption: option1.toLowerCase(),
        });
      });
    }

    this.totalOptions = result;
  }

  submitForm() {
    const formErrors = this.getFormErrors(this.productForm);
    const formValue = this.productForm.value;
    const formData = new FormData();

    this.valueOptionPrice = this.optionPrice
      .toArray()
      .map((input) => input.nativeElement.value);
    this.valueOptionStock = this.optionStock
      .toArray()
      .map((input) => input.nativeElement.value);
    if (this.productForm.value.second_type) {
      this.resultType.push(this.productForm.value.second_type);
    }
    if (this.productForm.value.first_type) {
      this.resultType.push(this.productForm.value.first_type);
    }

    const result: ProductType[] = [];
    let optionSecond: any[] = [];

    // Convert type, stock, and price into a dictionary
    if (this.resultType) {
      this.resultType.forEach((typeName: string, index: number) => {
        const options: OptionInfo[] = [];
        this.totalOptions.forEach((opt) => {
          if (!options.some((o) => o.option === opt.firstOption)) {
            if (index === 0) {
              // if (options[index]?.option !== opt.firstOption)
              options.push({
                option: opt.firstOption,
                prices: [],
              });
            }
            if (index === 1) {
              if (!optionSecond.includes(opt.secondOption))
                options.push({
                  option: opt.secondOption,
                });
              optionSecond.push(opt.secondOption);
            }
          }
        });
        const productType: ProductType = {
          name_product_type: typeName,
          options,
        };
        result.push(productType);
      });

      // Populate prices for each option
      this.totalOptions.forEach((opt, index) => {
        const optionName = opt.firstOption;
        const optionValue = opt.secondOption;
        const priceInfo: PriceInfo = {
          stock: parseInt(this.valueOptionStock[index]),
          option: optionValue,
          price: parseInt(this.valueOptionPrice[index]),
        };
        const optionInfo = result[0].options.find(
          (o) => o.option === optionName
        );
        if (optionInfo) {
          optionInfo.prices?.push(priceInfo);
        }
      });
    }

    if (this.listFile.length === 0 && this.listImage.length === 0) {
      this.toastrService.error('Vui lòng đính kèm hình ảnh sản phẩm!');
    } else if (formErrors.length > 0) {
      for (let i = 0; i < formErrors.length; i++) {
        const item: any = formErrors[i];
        this.toastrService.error(item.error);
        if (item) {
          break;
        }
      }
    } else {
      this.loading = true;
      // add new product
      if (!this.isEdit) {
        for (let i = 0; i < this.listFile.length; i++) {
          formData.append('', this.listFile[i]);
        }
        formData.append('shopID', String(this.dataUser.Shop.id));
        formData.append('categoryFilterID', String(this.categoryFilterID));
        formData.append('name', String(formValue.name));
        formData.append('desc', String(formValue.desc));
        formData.append('quantity', String(formValue.quantity));
        formData.append('price_original', String(formValue.price_original));
        formData.append('width', String(formValue.width));
        formData.append('height', String(formValue.height));
        formData.append('length', String(formValue.length));
        formData.append('weight', String(formValue.weight));
        formData.append('warehouseID', String(this.dataUser.Shop.Warehouse.id));
        // formData.append(
        //   'productTypes',
        //   JSON.stringify([
        //     {
        //       name_product_type: 'Màu Sắc',
        //       options: [
        //         {
        //           option: 'Xanh',
        //           prices: [
        //             {
        //               stock: 10,
        //               price: 100,
        //             },
        //           ],
        //         },
        //         {
        //           option: 'Đỏ',
        //           prices: [
        //             {
        //               stock: 20,
        //               price: 900,
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   ])
        // );
        formData.append('productTypes', JSON.stringify(result));

        this.productService.createProduct(formData).subscribe((data) => {
          this.loading = false;
          if (+data.EC === 1 || +data.EC === -1) {
            this.toastrService.error(data.EM);
          }
          if (+data.EC === 0) {
            this.toastrService.success(data.EM);
          }
        });
      }
      if (this.isEdit) {
        for (let i = 0; i < this.listFile.length; i++) {
          formData.append('', this.listFile[i]);
        }
        formData.append('id', String(this.productID));
        formData.append('shopID', String(this.dataUser.Shop.id));
        formData.append('categoryFilterID', String(this.categoryFilterID));
        formData.append('name', String(formValue.name));
        formData.append('desc', String(formValue.desc));
        formData.append('quantity', String(formValue.quantity));
        formData.append('price_original', String(formValue.price_original));
        formData.append('width', String(formValue.width));
        formData.append('height', String(formValue.height));
        formData.append('length', String(formValue.length));
        formData.append('weight', String(formValue.weight));
        formData.append('warehouseID', String(this.dataUser.Shop.Warehouse.id));
        formData.append('listImage', JSON.stringify(this.listImage));
        this.productService.updateProduct(formData).subscribe((data) => {
          this.loading = false;
          if (+data.EC === 1 || +data.EC === -1) {
            this.toastrService.error(data.EM);
          }
          if (+data.EC === 0) {
            this.toastrService.success(data.EM);
            this.router.navigate(['/seller/portal/product/list']);
          }
        });
      }
    }
  }

  async handleChangeImageProduct(e: any) {
    if (
      this.listFile.length < 5 &&
      !this.listFile.includes(e.target.files[0])
    ) {
      let strToReplace = await toBase64(e.target.files[0]);
      this.listFile.push(e.target.files[0]);
      this.listBase64.push({
        file: e.target.files[0],
        base64: String(strToReplace)?.replace(/^data:image\/[a-z]+;base64/, ''),
      });
    }
  }

  handleDeleteImage(image: any) {
    if (this.listFile) {
      this.listBase64 = this.listBase64.filter(
        (item) => item.base64 !== image.base64
      );
      this.listFile = this.listFile.filter((item) => item !== image.file);
      if (this.fileInputRef && this.fileInputRef.nativeElement) {
        this.fileInputRef.nativeElement.value = ''; // Reset the value of the file input element
      }
    }
    if (this.listImage) {
      this.listImage = this.listImage.filter(
        (data) => data.Image_Product_Detail.photo_url !== image
      );
    }
  }

  productForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    first_type: ['', Validators.compose([Validators.required])],
    second_type: ['', Validators.compose([Validators.required])],
    category: [''],
    desc: [
      '',
      Validators.compose([Validators.required, Validators.minLength(200)]),
    ],
    price_original: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/),
      ]),
    ],
    quantity: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/),
      ]),
    ],
    weight: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/),
      ]),
    ],
    length: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/),
      ]),
    ],
    width: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/),
      ]),
    ],
    height: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/),
      ]),
    ],
  });

  getFormErrors(formGroup: FormGroup): string[] {
    const errors: any[] = [];
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        formGroup.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          if (key === 'name') {
            errors.push({
              key: key,
              error: 'Tên không được để trống!',
            });
          } else if (key === 'desc') {
            if (keyError === 'required') {
              errors.push({ key: key, error: 'Mô tả không được để trống!' });
            } else {
              errors.push({
                key: key,
                error: 'Mô tả tối thiểu 1000 ký tự!',
              });
            }
          }
          // else if (key === 'price_original') {
          //   if (keyError === 'required') {
          //     errors.push({ key: key, error: 'Giá không được để trống!' });
          //   } else {
          //     errors.push({
          //       key: key,
          //       error: 'Giá phải là số và là số dương!',
          //     });
          //   }
          // }
          // else if (key === 'quantity') {
          //   if (keyError === 'required') {
          //     errors.push({ key: key, error: 'Kho hàng không được để trống!' });
          //   } else {
          //     errors.push({
          //       key: key,
          //       error: 'Kho hàng phải là số và là số dương!',
          //     });
          //   }
          // }
          else if (key === 'weight') {
            if (keyError === 'required') {
              errors.push({ key: key, error: 'Cân nặng không được để trống!' });
            } else {
              errors.push({
                key: key,
                error: 'Cân nặng phải là số và là số dương!',
              });
            }
          } else if (key === 'length') {
            if (keyError === 'required') {
              errors.push({
                key: key,
                error: 'Chiều dài không được để trống!',
              });
            } else {
              errors.push({
                key: key,
                error: 'Chiều dài phải là số và là số dương!',
              });
            }
          } else if (key === 'width') {
            if (keyError === 'required') {
              errors.push({
                key: key,
                error: 'Chiều rộng không được để trống!',
              });
            } else {
              errors.push({
                key: key,
                error: 'Chiều rộng phải là số và là số dương!',
              });
            }
          } else if (key === 'height') {
            if (keyError === 'required') {
              errors.push({
                key: key,
                error: 'Chiều dài không được để trống!',
              });
            } else {
              errors.push({
                key: key,
                error: 'Chiều dài phải là số và là số dương!',
              });
            }
          }
        });
      }
    });
    return errors;
  }

  addFirstOption(i: number) {
    this.formControlFirstOptions.push(i);
  }

  deleteFirstOption(i: number) {
    this.totalOptions = this.totalOptions.filter((item) => {
      return item.firstOption !== this.valueFirstOption[i];
    });
    if (i > 0) {
      this.formControlFirstOptions = this.formControlFirstOptions.filter(
        (item, index) => index !== i
      );
    }
  }

  addSecondOption(i: number) {
    this.formControlSecondOptions.push(i);
  }

  deleteSecondOption(i: number) {
    if (i < 1) {
      this.isChooseSecondOption = false;
      this.totalOptions.forEach((obj) => {
        delete obj.secondOption;
      });
    } else {
      this.totalOptions = this.totalOptions.filter((item) => {
        return item.secondOption !== this.valueSecondOption[i];
      });
      this.formControlSecondOptions = this.formControlSecondOptions.filter(
        (item, index) => index !== i
      );
    }
  }

  handleChooseOption() {
    this.isChooseOption = true;
  }

  destroyOption() {
    this.isChooseOption = false;
    this.isChooseSecondOption = false;
    this.totalOptions = [];
    this.resultType = [];
    this.valueOptionPrice = [];
    this.valueOptionStock = [];
    this.productForm.patchValue({
      second_type: '',
      first_type: '',
    });
  }

  openModalChooseCategory() {
    this.dialog.open(SellerProductCategoryModalComponent, {
      data: {
        type: 'create',
      },
    });
  }

  openModalEditCategory() {
    this.dialog.open(SellerProductCategoryModalComponent, {
      data: {
        type: 'edit',
      },
    });
  }

  handleFocus(inputName: string) {
    this.focusInput = inputName;
  }

  scrollToSection(sectionId: string) {
    const containerElement: HTMLElement = this.formContainer.nativeElement;
    const sectionElement: HTMLElement | null = containerElement.querySelector(
      `#${sectionId}`
    );
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private productService: ProductService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data: any) => {
      this.dataUser = data;
    });
    this.route.params
      .pipe(
        pluck('id'),
        tap((item) => (this.productID = item)),
        switchMap((id) => this.productService.readSingleProduct(id)),
        filter((product) => !!product)
      )
      .subscribe((data: any) => {
        if (data.DT === null) {
          this.router.navigate(['seller/portal/product/new']);
        }
        if (data.DT !== '') {
          this.listImage = data.DT.Image_Products;
          this.productForm.patchValue({
            name: data.DT.Product_Detail?.name,
            desc: data.DT.Product_Detail?.desc,
            price_original: String(data.DT.Product_Detail?.price_original),
            quantity: String(data.DT.Stock?.quantity),
            length: String(data.DT.Product_Detail?.length),
            width: String(data.DT.Product_Detail?.width),
            height: String(data.DT.Product_Detail?.height),
            weight: String(data.DT.Product_Detail?.weight),
          });
          this.categoryService.categoryFilter = data.DT.categoryFilterID;
          this.isEdit = true;
        }
      });
    this.categoryService.categoryFilter$.subscribe(
      (categoryFilterID: number) => {
        this.categoryFilterID = categoryFilterID;
        this.categoryService
          .readSingleCategoryFilter(categoryFilterID)
          .subscribe((data) => {
            this.nameCategory = data.DT?.Category.name_category;
            this.nameCategoryFilter = data.DT?.name_category_filter;
          });
      }
    );
  }
}
