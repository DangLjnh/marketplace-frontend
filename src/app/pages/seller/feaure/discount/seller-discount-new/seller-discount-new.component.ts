import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SellerDiscountProductModalComponent } from '../seller-discount-product-modal/seller-discount-product-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { ProductService } from '../../../data-access/product.service';
import { IProduct, IUser } from 'src/app/shared/model/interface';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged, pluck, switchMap, filter, tap } from 'rxjs';
import { DiscountService } from '../../../data-access/discount/discount.service';
import { errorCode } from 'src/app/shared/model/model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-seller-discount-new',
  templateUrl: './seller-discount-new.component.html',
  styleUrls: ['./seller-discount-new.component.scss'],
})
export class SellerDiscountNewComponent implements OnInit, OnDestroy {
  @ViewChild('picker') picker: any;
  @ViewChild('picker1') picker1: any;
  listCheckProduct: IProduct[] = [];
  listCheckProductOption: any[] = [];
  dataDiscount: any;
  discountPercentID!: number;
  dataUser!: IUser;
  date: Date = new Date();
  disabled = true;
  minDate: Date | null = new Date();
  now = new Date();

  submitForm() {
    const percentControl = this.discountForm.get('percent');
    if (!percentControl?.errors?.['invalidPercent']) {
      this.toastrService.error('Phần trăm phải là số và nhỏ hơn 100');
    } else {
      const discountFormValue = this.discountForm.value;
      const listIdProduct: number[] = [];
      const listIdProductOption: number[] = [];
      this.listCheckProduct.forEach((product) => {
        listIdProduct.push(product.id);
      });
      this.listCheckProductOption.forEach((product) => {
        listIdProductOption.push(product.Product_Price_Options.id);
      });
      const rawDiscountData = {
        date_start: discountFormValue.date_start,
        date_end: discountFormValue.date_end,
        percent: discountFormValue.percent,
        name: discountFormValue.name,
        discountID: this.dataUser.Shop.Discount.id,
        list_product: listIdProduct,
        list_product_option: listIdProductOption,
        id: this.discountPercentID,
      };
      if (this.discountPercentID) {
        this.discountService
          .updateDiscountPercent(rawDiscountData)
          .subscribe((data) => {
            if (
              +data.EC === errorCode.ERROR_PARAMS ||
              +data.EC === errorCode.ERROR_SERVER
            ) {
              this.toastrService.error(data.EM);
            }
            if (+data.EC === errorCode.SUCCESS) {
              this.toastrService.success(data.EM);
            }
          });
      } else {
        this.discountService
          .createDiscount(rawDiscountData)
          .subscribe((data) => {
            if (
              +data.EC === errorCode.ERROR_PARAMS ||
              +data.EC === errorCode.ERROR_SERVER
            ) {
              this.toastrService.error(data.EM);
            }
            if (+data.EC === errorCode.SUCCESS) {
              this.toastrService.success(data.EM);
            }
          });
      }
    }
  }

  openModalCreateProduct() {
    this.dialog.open(SellerDiscountProductModalComponent, {
      data: {
        type: 'create',
      },
    });
  }

  openModalEditProduct() {
    this.dialog.open(SellerDiscountProductModalComponent, {
      data: {
        type: 'edit',
      },
    });
  }
  percentValidator(control: AbstractControl): { [key: string]: any } | null {
    const percent = Number(control.value);
    if (percent > 0 || percent < 100) {
      return { invalidPercent: true };
    }
    return null;
  }
  discountForm = this.fb.group({
    name: [''],
    date_start: [new Date(this.now.getTime() + 10 * 60000)],
    date_end: [new Date(this.now.getTime() + 70 * 60000)],
    percent: [
      '',
      [
        Validators.required,
        // Validators.minLength(10),
        Validators.pattern(/^[0-9]+$/),
        this.percentValidator,
      ],
    ],
  });
  formatDate() {
    const dateStartControl = this.discountForm.get('date_start');
    const dateEndControl = this.discountForm.get('date_end');
    dateStartControl?.valueChanges.subscribe((dateStartChange) => {
      const dateEnd = dateEndControl?.value; // Corrected variable assignment
      const dateStart = dateStartChange; // Corrected variable assignment
      this.minDate = dateStart;
      if (dateStart && dateEnd && dateEnd.getTime() < dateStart.getTime()) {
        const endDate = new Date(dateStart);
        endDate.setHours(dateEnd.getHours());
        endDate.setMinutes(dateEnd.getMinutes());
        endDate.setSeconds(dateEnd.getSeconds());
        dateEndControl?.setValue(endDate);
      }
    });
    dateEndControl?.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((dateEnd) => {
        if (dateEnd && dateStartControl && dateStartControl.value) {
          const dateStart = dateStartControl.value;
          if (dateEnd.getTime() === dateStart.getTime()) {
            const endDate = new Date(dateStart.getTime() + 60 * 60000);
            dateEndControl.setValue(endDate);
          }
        }
      });
  }
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private productService: ProductService,
    private fb: FormBuilder,
    private discountService: DiscountService,
    private toastrService: ToastrService,
    private readonly route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.productService.listCheckProduct = [];
    this.productService.listCheckProductOption = [];
  }
  ngOnInit(): void {
    this.route.params
      .pipe(
        pluck('id'),
        tap((id) => (this.discountPercentID = id)),
        switchMap((id) => this.discountService.readSingleDiscountPercent(id)),
        filter((product) => !!product)
      )
      .subscribe((data) => {
        if (data.DT.data !== null) {
          this.dataDiscount = data.DT.data;
          if (data.DT.dataProduct?.length > 0) {
            data.DT.dataProduct.forEach((item: IProduct) => {
              item.checked = true;
            });
            this.productService.listCheckProduct = data.DT.dataProduct;
          }
          if (data.DT.dataProductOption?.length > 0) {
            const change: any = [];
            data.DT.dataProductOption.forEach((item: any) => {
              item.Product.Product_Price_Options.forEach((data: any) => {
                const val = {
                  Image_Products: item.Product.Image_Products,
                  Product_Detail: item.Product.Product_Detail,
                  Product_Price_Options: data,
                  checked:
                    +this.discountPercentID === data.discountPercentID
                      ? true
                      : false,
                };
                const checkExist = change.some(
                  (item: any) => item.Product_Price_Options.id === data.id
                );
                if (!checkExist) change.push(val);
              });
            });
            this.productService.listCheckProductOption = change;
          }
          console.log('cc');

          this.discountForm.patchValue({
            name: data.DT.data?.name,
            date_start: data.DT.data?.date_start,
            date_end: data.DT.data?.date_end,
            percent: data.DT.data?.percent,
          });
        }
      });

    this.authService.dataUser$.subscribe((data) => {
      this.dataUser = data;
    });
    this.productService.listCheckProduct$.subscribe((data: IProduct[]) => {
      this.listCheckProduct = data.filter((data) => data.checked === true);
    });
    this.productService.listCheckProductOption$.subscribe(
      (data: IProduct[]) => {
        this.listCheckProductOption = data.filter(
          (data) => data.checked === true
        );
      }
    );
    this.formatDate();
  }
}
