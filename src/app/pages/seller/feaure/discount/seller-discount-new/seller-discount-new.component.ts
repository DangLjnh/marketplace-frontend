import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SellerDiscountProductModalComponent } from '../seller-discount-product-modal/seller-discount-product-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { ProductService } from '../../../data-access/product.service';
import { IProduct, IUser } from 'src/app/shared/model/interface';
import { FormBuilder } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { DiscountService } from '../../../data-access/discount/discount.service';
import { errorCode } from 'src/app/shared/model/model';
@Component({
  selector: 'app-seller-discount-new',
  templateUrl: './seller-discount-new.component.html',
  styleUrls: ['./seller-discount-new.component.scss'],
})
export class SellerDiscountNewComponent implements OnInit {
  @ViewChild('picker') picker: any;
  @ViewChild('picker1') picker1: any;
  listCheckProduct: IProduct[] = [];
  listCheckProductOption: any[] = [];
  dataUser!: IUser;
  date: Date = new Date();
  disabled = true;
  minDate: Date | null = new Date();
  now = new Date();

  submitForm() {
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
      discountID: this.dataUser.Shop.Discount.id,
      list_product: listIdProduct,
    };
    const rawDiscountOptionData = {
      date_start: discountFormValue.date_start,
      date_end: discountFormValue.date_end,
      percent: discountFormValue.percent,
      discountID: this.dataUser.Shop.Discount.id,
      list_product: listIdProductOption,
    };
    this.discountService.createDiscount(rawDiscountData).subscribe(() => {
      this.discountService
        .createDiscountOption(rawDiscountOptionData)
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
    });
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
  discountForm = this.fb.group({
    date_start: [new Date(this.now.getTime() + 10 * 60000)], //after 10 min
    date_end: [new Date(this.now.getTime() + 70 * 60000)], // after 1 hour & 10 min
    percent: [''],
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
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
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
        console.log(
          '🚀 ~ file: seller-discount-new.component.ts:134 ~ SellerDiscountNewComponent ~ ngOnInit ~ this.listCheckProductOption:',
          this.listCheckProductOption
        );
      }
    );
    this.formatDate();
  }
}
