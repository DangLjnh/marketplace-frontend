import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { CustomerService } from 'src/app/pages/customer/data-access/customer.service';
import { IUser } from 'src/app/shared/model/interface';
import { toBase64 } from 'src/app/shared/utils/function';
import { environment } from 'src/environments/environment.prod';
import { SellerService } from '../../../data-access/seller.service';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from 'src/app/pages/shop/data-access/shop.service';
import { errorCode } from 'src/app/shared/model/model';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss'],
})
export class SellerProfileComponent {
  loading: boolean = false;
  cities$!: Observable<any>;
  districts$!: Observable<any>;
  wards!: any[];
  cityCode!: number;
  dataUser!: IUser;
  base64Image!: string;
  fileImage!: File;

  submitForm() {
    const formErrors = this.getFormErrors(this.shopForm);
    const formValue = this.shopForm.value;
    this.loading = true;
    const formData = new FormData();
    const rawData = {
      ...formValue,
      id: this.dataUser.Shop.id,
      email: this.dataUser.User_Detail.email,
      phone: this.dataUser.phone,
      userID: this.dataUser.id,
      city_code: this.cityCode,
    };
    formData.append('file', this.fileImage);
    formData.append('data', JSON.stringify(rawData));
    if (formErrors.length > 0 && formValue.email !== '') {
      for (let i = 0; i < formErrors.length; i++) {
        const item: any = formErrors[i];
        this.toastrService.error(item.error);
        if (item) {
          break;
        }
      }
    } else {
      this.sellerService.updateShop(formData).subscribe((data) => {
        if (+data.EC === 1 || +data.EC === -1) {
          this.toastrService.error(data.EM);
        } else {
          this.authService.accountUser().subscribe((dataUser: any) => {
            this.dataUser = dataUser;
            this.loading = false;
            if (
              +data.EC === errorCode.ERROR_PARAMS ||
              +data.EC === errorCode.ERROR_SERVER
            ) {
              this.toastrService.error(data.EM);
              return;
            }
            if (+data.EC === errorCode.SUCCESS) {
              this.authService.dataUser = dataUser.DT;
              this.toastrService.success(data.EM);
            }
          });
        }
      });
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
  handleChooseCity(cityCode: number) {
    this.cityCode = cityCode;
    this.wards = [];
    this.districts$ = this.customerService
      .readDistrictOfCity(cityCode)
      .pipe(map((data) => data.districts));
    return this.customerService
      .readDistrictOfCity(cityCode)
      .pipe(map((data) => data.districts));
  }
  handleChooseDistrict(districtName: string) {
    this.districts$
      .pipe(
        map((data: any) =>
          data.find((district: any) => district.name === districtName)
        ),
        tap((district: any) => {
          this.wards = district.wards;
        })
      )
      .subscribe();
  }
  shopForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    email: ['', Validators.required],
    phone: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[0-9]+$/),
      ]),
    ],
    slug: ['', Validators.required],
    city: ['', Validators.required],
    district: ['', Validators.required],
    ward: ['', Validators.required],
    address: ['', Validators.required],
  });
  getFormErrors(formGroup: FormGroup): string[] {
    const errors: any[] = [];
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        formGroup.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          if (key === 'name') {
            if (keyError === 'required') {
              errors.push({ key: key, error: 'Tên shop không được để trống!' });
            } else {
              errors.push({
                key: key,
                error: 'Tên shop không vượt quá 30 ký tự!',
              });
            }
          } else if (key === 'phone') {
            if (keyError === 'required') {
              errors.push({
                key: key,
                error: 'Số điện thoại không được để trống!',
              });
            } else {
              errors.push({
                key: key,
                error: 'Số điện thoại của bạn phải là số và trên 10 ký tự',
              });
            }
          } else if (key === 'slug') {
            errors.push({ key: key, error: 'username không được để trống' });
          } else if (key === 'city') {
            errors.push({ key: key, error: 'Thành phố không được để trống!' });
          } else if (key === 'district') {
            errors.push({ key: key, error: 'Quận không được để trống!' });
          } else if (key === 'ward') {
            errors.push({ key: key, error: 'Phường không được để trống!' });
          } else if (key === 'address') {
            errors.push({ key: key, error: 'Số nhà không được để trống!' });
          }
        });
      }
    });
    return errors;
  }
  constructor(
    private customerService: CustomerService,
    private sellerService: SellerService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private shopService: ShopService
  ) {}
  ngOnInit(): void {
    this.cities$ = this.customerService.readAllCity();
    this.authService.dataUser$.subscribe((data: IUser) => {
      this.dataUser = data;
      if (data) {
        this.shopForm.patchValue({
          phone: data?.Shop?.Shop_Detail?.phone,
          email: data?.Shop?.Shop_Detail?.email,
          slug: data?.Shop?.slug,
          name: data?.Shop?.Shop_Detail?.name,
          city: data?.Shop?.Shop_Detail?.city,
          address: data?.Shop?.Shop_Detail?.address,
          district: data?.Shop?.Shop_Detail?.district,
          ward: data?.Shop?.Shop_Detail?.ward,
        });
        this.shopService
          .readSingleShop(String(data?.Shop?.id))
          .subscribe((data) => {
            if (data) {
              const dataDistricts$ = this.handleChooseCity(
                data.DT.Shop_Detail?.city_code
              );
              dataDistricts$.subscribe(() => {
                this.shopForm.patchValue({
                  district: data.DT.Shop_Detail?.district,
                  ward: data.DT.Shop_Detail?.ward,
                });
                this.handleChooseDistrict(data.DT.Shop_Detail?.district);
              });
            }
          });
      }
    });
    // this.handleChooseCity()
  }
}
